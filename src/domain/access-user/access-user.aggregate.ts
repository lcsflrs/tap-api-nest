import { AggregateRoot } from "@domain/@shared/interfaces/aggregate-root.abstract";
import { AccessUserID } from "@domain/access-user/access-user-id.value";
import { Email } from "@domain/@shared/value-objects/email.value";
import { Phone } from "@domain/@shared/value-objects/phone.value";
import { Cpf } from "@domain/@shared/value-objects/cpf.value";

export class AccessUser extends AggregateRoot<AccessUserID> {
  constructor(
    id: AccessUserID,
    private readonly _name: string,
    private readonly _email: Email,
    private _password: string,
    private _emailVerified: boolean = false,
    private _phoneVerified: boolean = false,
    private _isFirstAccess: boolean = true,
    private readonly _document: Cpf,
    private readonly _phone?: Phone,
    private _birthdate?: Date,
    private _emailCodeVerification?: string,
  ) {
    super(id);
  }

  static create(
    id: AccessUserID,
    email: Email,
    name: string,
    phone?: Phone,
    document?: Cpf,
  ): AccessUser {
    const now = new Date();

    if (name.length < 2 || name.length > 100) {
      throw new Error("Name must be between 2 and 100 characters");
    }

    return new AccessUser(
      id,
      name,
      email,
      "",
      false,
      false,
      true,
      document ?? new Cpf("00000000000"),
      phone,
    );
  }

  static fromJSON(json: AccessUserJSON): AccessUser {
    return new AccessUser(
      new AccessUserID(json.id),
      json.name,
      new Email(json.email),
      json.password,
      json.emailVerified ?? false,
      json.phoneVerified ?? false,
      json.isFirstAccess ?? true,
      new Cpf(json.document),
      json.phone ? new Phone(json.phone) : undefined,
      json.birthdate ? new Date(json.birthdate) : undefined,
      json.emailCodeVerification ?? undefined,
    );
  }

  toJSON(): AccessUserJSON {
    return {
      id: this.getId().getValue(),
      email: this.email.getValue(),
      name: this.name,
      phone: this.phone?.getValue() ?? null,
      document: this.document.getValue(),
      emailVerified: this._emailVerified,
      phoneVerified: this._phoneVerified,
      emailCodeVerification: this._emailCodeVerification ?? null,
      password: this._password,
      isFirstAccess: this._isFirstAccess,
      birthdate: this._birthdate ?? null,
    };
  }

  changePassword(hashedPassword: string): void {
    if (!hashedPassword.trim()) {
      throw new Error("Password cannot be empty");
    }

    this._password = hashedPassword;
    this._isFirstAccess = false;
  }

  verifyEmail(code: string): void {
    if (this._emailVerified) {
      throw new Error("Email has already been verified");
    }

    if (!this._emailCodeVerification) {
      throw new Error("Email verification code was not generated");
    }

    if (this._emailCodeVerification !== code) {
      throw new Error("Invalid code");
    }

    this._emailVerified = true;
  }

  getId(): AccessUserID {
    return this.id;
  }

  get email(): Email {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get phone(): Phone | undefined {
    return this._phone;
  }

  get document(): Cpf {
    return this._document;
  }

  get birthdate(): Date | undefined {
    return this._birthdate;
  }

  get isFirstAccess(): boolean {
    return this._isFirstAccess;
  }

  get emailVerified(): boolean {
    return this._emailVerified;
  }

  get phoneVerified(): boolean {
    return this._phoneVerified;
  }

  get emailCodeVerification(): string | undefined {
    return this._emailCodeVerification;
  }

  get password(): string {
    return this._password;
  }
}

interface AccessUserJSON {
  id: number;
  email: string;
  name: string;
  phone?: string | null;
  document: string;
  emailVerified?: boolean | null;
  phoneVerified?: boolean | null;
  emailCodeVerification?: string | null;
  password: string;
  isFirstAccess?: boolean | null;
  birthdate?: Date | string | null;
}
