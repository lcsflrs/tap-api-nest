import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateTemporaryWorkerCommand } from "./dtos/create-temporary-worker.command";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";
import { Worker } from "@domain/store/worker.entity";
import { WorkerID } from "@domain/store/worker-id.value";
import { ShopID } from "@domain/store/shop-id.value";
import { WorkerType } from "@domain/store/worker-type.value";

@CommandHandler(CreateTemporaryWorkerCommand)
export class CreateTemporaryWorkerHandler implements ICommandHandler<CreateTemporaryWorkerCommand> {
  constructor(
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
    @Inject("JwtService")
    private readonly jwtService: IJwtService,
  ) {}

  async execute(command: CreateTemporaryWorkerCommand) {
    const { shopId, name, expirationHours, role } = command;

    const worker = Worker.create(
      new WorkerID(0),
      new ShopID(shopId),
      WorkerType.fromNumber(role),
      name,
      expirationHours,
    );

    const savedWorker = await this.storeRepository.createWorker(worker);

    const accessJwt = await this.jwtService.sign({
      shopId: savedWorker.shopId.getValue(),
      workerId: savedWorker.getId().getValue(),
    });

    return {
      workerId: savedWorker.getId().getValue(),
      shopId: savedWorker.shopId.getValue(),
      name: savedWorker.name,
      expirationHours: savedWorker.getExpirationHours(),
      expirationDate: savedWorker.expirationDate,
      role: savedWorker.role.getNumericValue(),
      accessJwt,
    };
  }
}
