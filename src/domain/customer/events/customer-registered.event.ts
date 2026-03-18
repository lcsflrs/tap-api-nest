export class CustomerRegisteredEvent {
  constructor(
    public readonly customerId: number,
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly document: string,
  ) {}
}
