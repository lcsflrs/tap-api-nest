import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import type { Request } from "express";
import { VerifyWorkerAccessQuery } from "@application/queries/dtos/verify-worker-access.query";

type VerifyWorkerAccessResult = {
  workerId: number;
  shopId: number;
  partyId: number;
  role: number;
};

@Injectable()
export class WorkerGuard implements CanActivate {
  constructor(private readonly queryBus: QueryBus) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error("No token provided");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      throw new Error("Unauthorized");
    }

    try {
      const workerData = await this.queryBus.execute<
        VerifyWorkerAccessQuery,
        VerifyWorkerAccessResult
      >(new VerifyWorkerAccessQuery(token));

      if (!workerData?.workerId) {
        throw new Error("Unauthorized");
      }

      request.user = {
        workerId: workerData.workerId,
        shopId: workerData.shopId,
        partyId: workerData.partyId,
        role: workerData.role,
        id: workerData.workerId,
      };

      return true;
    } catch {
      throw new Error("Unauthorized");
    }
  }
}
