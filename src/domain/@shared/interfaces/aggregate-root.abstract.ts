import { Entity } from "./entity.abstract";

export abstract class AggregateRoot<TId> extends Entity<TId> {
  constructor(id: TId) {
    super(id);
  }
}
