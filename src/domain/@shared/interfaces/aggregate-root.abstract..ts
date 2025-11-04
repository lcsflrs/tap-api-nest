import { Entity } from "./entity.abstract";
import type { Uuid } from "./uuid";

export abstract class AggregateRoot extends Entity {
  constructor(id: Uuid) {
    super(id);
  }
}
