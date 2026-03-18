import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { IngressStatusID } from "./ingress-status-id.value";

export class IngressStatus extends Entity<IngressStatusID> {
  constructor(
    id: IngressStatusID,
    private readonly _status: string,
  ) {
    super(id);
  }

  static create(id: IngressStatusID, status: string): IngressStatus {
    if (!status.trim()) {
      throw new Error("IngressStatus status is required");
    }

    return new IngressStatus(id, status.trim());
  }

  static fromJSON(json: IngressStatusJSON): IngressStatus {
    return new IngressStatus(new IngressStatusID(json.id), json.status);
  }

  toJSON(): IngressStatusJSON {
    return {
      id: this.getId().getValue(),
      status: this._status,
    };
  }

  get status(): string {
    return this._status;
  }
}

export interface IngressStatusJSON {
  id: number;
  status: string;
}
