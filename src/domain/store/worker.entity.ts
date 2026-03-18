import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { WorkerID } from "./worker-id.value";
import { WorkerType } from "./worker-type.value";
import { ShopID } from "./shop-id.value";
import { AccessUserID } from "@domain/access-user/access-user-id.value";

export class Worker extends Entity<WorkerID> {
  constructor(
    id: WorkerID,
    private readonly _shopId: ShopID,
    private readonly _accessUserId: AccessUserID | null,
    private readonly _name: string | null,
    private readonly _role: WorkerType,
    private _active: boolean,
    private _expirationDate: Date | null,
    private readonly _expirationHours: number,
  ) {
    super(id);
  }

  static create(
    id: WorkerID,
    shopId: ShopID,
    role: WorkerType,
    name: string | null,
    expirationHours: number,
    accessUserId: AccessUserID | null = null,
  ): Worker {
    if (expirationHours <= 0) {
      throw new Error("Expiration hours must be greater than 0");
    }

    const now = new Date();
    const expirationDate = new Date(
      now.getTime() + expirationHours * 60 * 60 * 1000,
    );

    return new Worker(
      id,
      shopId,
      accessUserId,
      name,
      role,
      true,
      expirationDate,
      expirationHours,
    );
  }

  static fromJSON(json: WorkerJSON): Worker {
    return new Worker(
      new WorkerID(json.id),
      new ShopID(json.shopId),
      json.accessUserId ? new AccessUserID(json.accessUserId) : null,
      json.name ?? null,
      WorkerType.fromNumber(json.role),
      json.active ?? true,
      json.expirationDate ? new Date(json.expirationDate) : null,
      json.expirationHours ?? 0,
    );
  }

  toJSON(): WorkerJSON {
    return {
      id: this.getId().getValue(),
      shopId: this._shopId.getValue(),
      accessUserId: this._accessUserId?.getValue() ?? null,
      role: this._role.getNumericValue(),
      active: this._active,
      name: this._name ?? null,
      expirationDate: this._expirationDate?.toISOString() ?? null,
    };
  }

  deactivate(): void {
    this._active = false;
  }

  isExpired(): boolean {
    if (!this._expirationDate) {
      return false;
    }

    return this._expirationDate <= new Date();
  }

  isActiveAndNotExpired(): boolean {
    return this._active && !this.isExpired();
  }

  getTtlMs(): number {
    if (!this._expirationDate) {
      return 0;
    }

    return Math.max(0, this._expirationDate.getTime() - Date.now());
  }

  get shopId(): ShopID {
    return this._shopId;
  }

  get accessUserId(): AccessUserID | null {
    return this._accessUserId;
  }

  get name(): string | null {
    return this._name;
  }

  get role(): WorkerType {
    return this._role;
  }

  get active(): boolean {
    return this._active;
  }

  get expirationDate(): Date | null {
    return this._expirationDate;
  }

  getExpirationHours(): number {
    return this._expirationHours;
  }
}

export interface WorkerJSON {
  id: number;
  shopId: number;
  accessUserId?: number | null;
  role: number;
  active: boolean;
  name?: string | null;
  expirationDate?: string | null;
  expirationHours?: number;
}
