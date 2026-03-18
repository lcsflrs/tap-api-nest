import { CustomerID } from "./customer-id.value";
import { Email } from "../@shared/value-objects/email.value";
import { Phone } from "../@shared/value-objects/phone.value";
import { Cpf } from "../@shared/value-objects/cpf.value";
import { CustomerWallet } from "./customer-wallet.entity";
import { CreditCard } from "./credit-card.entity";

export class Customer {
  constructor(
    private readonly _id: CustomerID,
    private _name: string,
    private _email: Email,
    private _phone?: Phone,
    private _document?: Cpf,
    private _wallet?: CustomerWallet,
    private _creditCards: CreditCard[] = [],
    private _ioCustomerId?: string,
  ) {}

  static create(id: CustomerID, name: string, email: Email): Customer {
    if (!name.trim()) {
      throw new Error("customer name is required");
    }

    return new Customer(id, name, email);
  }

  toJSON() {
    return {
      id: this._id.getValue(),
      name: this._name,
      email: this._email.getValue(),
      phone: this._phone?.getValue(),
      document: this._document?.getValue(),
      ioCustomerId: this._ioCustomerId,
      wallet: this._wallet?.toJSON(),
      creditCards: this._creditCards.map((c) => c.toJSON()),
    };
  }

  setIoCustomerId(ioCustomerId: string): void {
    this._ioCustomerId = ioCustomerId;
  }

  addCreditCard(creditCard: CreditCard): void {
    const alreadyExists = this._creditCards.some(
      (c) => c.cardId === creditCard.cardId,
    );

    if (alreadyExists) {
      throw new Error("Credit card already added");
    }

    this._creditCards.push(creditCard);
  }

  updatePendentData(document: string, phone: string): void {
    if (this._document && this._phone) {
      throw new Error("customer data already registered");
    }

    this._document = new Cpf(document);
    this._phone = new Phone(phone);
  }

  registerWallet(): void {
    if (this._wallet) {
      throw new Error("customer wallet already registered");
    }

    this._wallet = CustomerWallet.create(this._id.getValue(), 0);
  }

  isProfileComplete(): boolean {
    return !!this._phone && !!this._document;
  }

  getPendentFields(): string[] {
    const pendent: string[] = [];

    if (!this._phone) {
      pendent.push("phone");
    }

    if (!this._document) {
      pendent.push("document");
    }

    return pendent;
  }

  getId(): CustomerID {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get phone(): Phone | undefined {
    return this._phone;
  }

  get document(): Cpf | undefined {
    return this._document;
  }

  get wallet(): CustomerWallet | undefined {
    return this._wallet;
  }

  get creditCards(): CreditCard[] {
    return this._creditCards;
  }

  get ioCustomerId(): string | undefined {
    return this._ioCustomerId;
  }
}
