export interface ProductTicketItem {
  shopProductId: number;
  quantity: number;
}

export class ProductTicket {
  constructor(
    private readonly _workerId: number,
    private readonly _paymentMethod: string,
    private readonly _products: ProductTicketItem[],
  ) {}

  static create(
    workerId: number,
    paymentMethod: string,
    products: ProductTicketItem[],
  ): ProductTicket {
    if (products.length === 0) {
      throw new Error("product ticket must have at least one product");
    }

    if (!paymentMethod.trim()) {
      throw new Error("payment method is required");
    }

    return new ProductTicket(workerId, paymentMethod, products);
  }

  get workerId(): number {
    return this._workerId;
  }

  get paymentMethod(): string {
    return this._paymentMethod;
  }

  get products(): ProductTicketItem[] {
    return [...this._products];
  }
}
