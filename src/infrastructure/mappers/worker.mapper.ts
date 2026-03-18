import { Worker } from "@domain/store/worker.entity";

export class WorkerMapper {
  static toDomain(worker: any): Worker {
    return Worker.fromJSON({
      id: worker.id,
      shopId: worker.shopId,
      accessUserId: worker.accessUserId ?? null,
      role: worker.role,
      active: worker.active,
      name: worker.name ?? null,
      expirationDate: worker.expirationDate
        ? (worker.expirationDate as Date).toISOString()
        : null,
      expirationHours: worker.expirationHours ?? 0,
    });
  }

  static toPersistence(worker: Worker) {
    const json = worker.toJSON();

    return {
      shopId: json.shopId,
      accessUserId: json.accessUserId ?? null,
      role: json.role,
      active: json.active,
      name: json.name ?? null,
      expirationDate: json.expirationDate
        ? new Date(json.expirationDate)
        : null,
      expirationHours: worker.getExpirationHours(),
    };
  }
}
