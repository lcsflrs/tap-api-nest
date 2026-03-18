import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Inject, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Server, Socket } from "socket.io";
import type { ISocketService } from "./socket.interface";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";
import { PaymentTokenSchemaClass } from "@infrastructure/mongodb/schemas/payment-token.schema";

@WebSocketGateway({ cors: { origin: "*" } })
export class AppSocketGateway
  implements
    OnGatewayConnection,
    OnGatewayDisconnect,
    ISocketService,
    OnModuleInit
{
  @WebSocketServer()
  private readonly server!: Server;
  private readonly tokenSocketIdMap = new Map<string, string>();

  constructor(
    @Inject("JwtService")
    private readonly jwtService: IJwtService,
    @InjectModel(PaymentTokenSchemaClass.name)
    private readonly paymentTokenModel: Model<PaymentTokenSchemaClass>,
  ) {}

  onModuleInit() {
    const changeStream = this.paymentTokenModel.watch([
      {
        $match: {
          $or: [{ operationType: "insert" }, { operationType: "update" }],
        },
      },
    ]);

    changeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        const token = change.fullDocument;
        this.server.emit(`new_token_party_${token.partyId}`, token);
      }
    });
  }

  handleConnection(socket: Socket) {}

  handleDisconnect(socket: Socket) {
    for (const [tokenId, id] of this.tokenSocketIdMap.entries()) {
      if (id === socket.id) {
        this.tokenSocketIdMap.delete(tokenId);
        break;
      }
    }
  }

  @SubscribeMessage("check_payment_token")
  async handleCheckPaymentToken(
    @MessageBody() paymentTokenId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        socket.emit("check_payment_token", { status: "not_found" });
        return;
      }

      await this.jwtService.verify(token);

      this.tokenSocketIdMap.set(paymentTokenId, socket.id);

      const paymentToken = await this.paymentTokenModel
        .findById(paymentTokenId)
        .exec();

      if (!paymentToken) {
        socket.emit("check_payment_token", { status: "not_found" });
        return;
      }

      socket.emit("update_payment_token", paymentToken.paymentStatus);
    } catch {
      socket.emit("check_payment_token", { status: "not_found" });
    }
  }

  emitOrderUpdate(
    orderId: string,
    status: "processing" | "paid" | "error_payment",
  ): void {
    const socketId = this.tokenSocketIdMap.get(orderId);
    if (socketId) {
      this.server.to(socketId).emit("update_order", status);
    }
  }

  emitPaymentTokenStatus(socketId: string, status: string): void {
    this.server.to(socketId).emit("update_payment_token", status);
  }

  emitToParty(channel: string, data: unknown): void {
    this.server.emit(channel, data);
  }

  emitPaymentTokenUpdate(paymentTokenId: string, status: string): void {
    const socketId = this.tokenSocketIdMap.get(paymentTokenId);

    if (socketId) {
      this.server.to(socketId).emit("update_payment_token", status);
    }
  }
}
