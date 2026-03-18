export class OwnerRegisteredEvent {
  constructor(
    public readonly ownerId: number,
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly document: string,
  ) {}
}
