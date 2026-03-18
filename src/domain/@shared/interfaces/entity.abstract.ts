export abstract class Entity<TId> {
  constructor(protected readonly id: TId) {}

  public getId(): TId {
    return this.id;
  }
}
