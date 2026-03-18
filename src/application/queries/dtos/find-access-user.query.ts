import { Query } from "@nestjs/cqrs";

export class FindAccessUserQuery extends Query<{
  id: number;
  name: string;
  email: string;
  phone: string;
  document: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  isFirstAccess: boolean;
} | null> {
  constructor(
    public readonly field: "email" | "id",
    public readonly value: string,
  ) {
    super();
  }
}
