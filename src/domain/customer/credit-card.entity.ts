import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { CreditCardID } from "./credit-card-id.value";
import { CustomerID } from "./customer-id.value";

export class CreditCard extends Entity<CreditCardID> {
  constructor(
    id: CreditCardID,
    private readonly _customerId: CustomerID,
    private readonly _cardId: string,
    private readonly _cardToken: string,
    private readonly _first4Digits: string,
    private readonly _last4Digits: string,
    private readonly _cardBrand: string,
    private readonly _expirationMonth: string,
    private readonly _expirationYear: string,
    private readonly _holderName: string,
    private _authenticated: boolean,
    private _authRandomCents: number | null,
    private _authTransactionId: string | null,
    private _authRefundDate: Date | null,
  ) {
    super(id);
  }

  static create(
    id: CreditCardID,
    customerId: CustomerID,
    cardId: string,
    cardToken: string,
    first4Digits: string,
    last4Digits: string,
    cardBrand: string,
    expirationMonth: string,
    expirationYear: string,
    holderName: string,
  ): CreditCard {
    if (!cardId.trim()) {
      throw new Error("cardId is required");
    }

    if (!cardToken.trim()) {
      throw new Error("Card token is required");
    }

    if (!first4Digits?.trim()) {
      throw new Error("First 4 digits are required");
    }

    if (!last4Digits.trim()) {
      throw new Error("Last 4 digits are required");
    }

    if (!cardBrand.trim()) {
      throw new Error("Card brand is required");
    }

    if (!holderName?.trim()) {
      throw new Error("Card holder name is required");
    }

    const month = Number(expirationMonth);
    const year = Number(expirationYear);

    if (Number.isNaN(month) || month < 1 || month > 12) {
      throw new Error("Invalid expiration month");
    }

    if (Number.isNaN(year)) {
      throw new Error("Invalid expiration year");
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      throw new Error("Card expiration date cannot be in the past");
    }

    return new CreditCard(
      id,
      customerId,
      cardId,
      cardToken,
      first4Digits,
      last4Digits,
      cardBrand,
      expirationMonth,
      expirationYear,
      holderName,
      false,
      null,
      null,
      null,
    );
  }

  static fromJSON(json: CreditCardJSON): CreditCard {
    return new CreditCard(
      new CreditCardID(json.id),
      new CustomerID(json.customerId),
      json.cardId,
      json.cardToken,
      json.first4Digits,
      json.last4Digits,
      json.cardBrand,
      json.expirationMonth,
      json.expirationYear,
      json.holderName,
      json.authenticated ?? false,
      json.authRandomCents ?? null,
      json.authTransactionId ?? null,
      json.authRefundDate ? new Date(json.authRefundDate) : null,
    );
  }

  toJSON(): CreditCardJSON {
    return {
      id: this.id.getValue(),
      customerId: this._customerId.getValue(),
      cardId: this._cardId,
      cardToken: this._cardToken,
      first4Digits: this._first4Digits,
      last4Digits: this._last4Digits,
      cardBrand: this._cardBrand,
      expirationMonth: this._expirationMonth,
      expirationYear: this._expirationYear,
      holderName: this._holderName,
      authenticated: this._authenticated,
      authRandomCents: this._authRandomCents,
      authTransactionId: this._authTransactionId,
      authRefundDate: this._authRefundDate?.toISOString() ?? null,
    };
  }

  markAsAuthenticated(randomCents: number, transactionId: string): void {
    if (this._authenticated) {
      throw new Error("Card already authenticated");
    }

    if (randomCents <= 0) {
      throw new Error("Random cents must be greater than zero");
    }

    if (!transactionId.trim()) {
      throw new Error("Transaction ID must be provided");
    }

    this._authenticated = true;
    this._authRandomCents = randomCents;
    this._authTransactionId = transactionId;
  }

  setAuthVerification(randomCents: number, transactionId: string): void {
    this._authRandomCents = randomCents;
    this._authTransactionId = transactionId;
  }

  confirmAuthentication(centsAmount: number): void {
    if (this._authenticated) {
      throw new Error("Card already authenticated");
    }

    if (this._authRandomCents === null) {
      throw new Error("Card has no pending authentication");
    }

    if (this._authRandomCents !== centsAmount) {
      throw new Error("Wrong cents amount");
    }

    this._authenticated = true;
    this._authRefundDate = new Date();
  }

  isAuthenticated(): boolean {
    return this._authenticated;
  }

  get cardId(): string {
    return this._cardId;
  }

  get authTransactionId(): string | null {
    return this._authTransactionId;
  }
}

export interface CreditCardJSON {
  id: number;
  customerId: number;
  cardId: string;
  cardToken: string;
  first4Digits: string;
  last4Digits: string;
  cardBrand: string;
  expirationMonth: string;
  expirationYear: string;
  holderName: string;
  authenticated?: boolean;
  authRandomCents?: number | null;
  authTransactionId?: string | null;
  authRefundDate?: string | null;
}
