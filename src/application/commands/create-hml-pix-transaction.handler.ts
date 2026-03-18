import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { randomBytes, randomUUID } from "crypto";
import { CreateHmlPixTransactionCommand } from "./dtos/create-hml-pix-transaction.command";
import type { IPixTransactionRepository } from "@infrastructure/repositories/interfaces/pix-transaction-repository.interface";
import { PixTransaction } from "@domain/payment/pix-transaction.aggregate";
import { PixTransactionID } from "@domain/payment/pix-transaction-id.value";
import { PixStatus } from "@domain/payment/pix-status.value";
import { PixType } from "@domain/payment/pix-type.value";

const HML_PIX_TTL_MINUTES = 30;
const HML_PIX_KEY = "00020126580014BR.GOV.BCB.PIXFICTICIO";
const HML_DESCRIPTION = "Pix de Saldo em hml";

@CommandHandler(CreateHmlPixTransactionCommand)
export class CreateHmlPixTransactionHandler implements ICommandHandler<CreateHmlPixTransactionCommand> {
  constructor(
    @Inject("PixTransactionRepository")
    private readonly pixTransactionRepository: IPixTransactionRepository,
  ) {}

  async execute(command: CreateHmlPixTransactionCommand) {
    const { customerId, amountInCents } = command;

    const referenceId = randomUUID();
    const transactionId = randomBytes(16).toString("hex");

    const expirationDate = new Date(
      Date.now() + HML_PIX_TTL_MINUTES * 60 * 1000,
    ).toISOString();

    const pixEmv =
      `00020126580014BR.GOV.BCB.PIX01${transactionId}520400005303986540${amountInCents.toFixed(2)}5802BRR5925Pix Dev Teste6009Sao Paulo62070503***6304B14F`.replace(
        /\s+/g,
        "",
      );

    const pix = PixTransaction.create(
      new PixTransactionID(0),
      customerId,
      null,
      transactionId,
      referenceId,
      PixStatus.paid(),
      expirationDate,
      HML_PIX_KEY,
      "",
      amountInCents,
      HML_DESCRIPTION,
      pixEmv,
      PixType.addBalance(),
    );

    await this.pixTransactionRepository.save(pix);

    return {
      customerId,
      transactionId: pix.transactionId,
      referenceId: pix.referenceId,
      status: pix.status.getValue(),
      expirationDate,
      pixKey: HML_PIX_KEY,
      pixQrCode: "",
      pixEmv: pix.pixEmv ?? "",
      amountInCents: pix.amount.getValue(),
      description: HML_DESCRIPTION,
    };
  }
}
