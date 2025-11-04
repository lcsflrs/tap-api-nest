import type { Uuid } from "./uuid";

export abstract class Entity {
  public readonly id: Uuid;

  constructor(id: Uuid) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }
}
