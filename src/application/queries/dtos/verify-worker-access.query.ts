import { Query } from "@nestjs/cqrs";

export class VerifyWorkerAccessQuery extends Query<{
  workerId: number;
  shopId: number;
  role: number;
}> {
  constructor(public readonly accessJwt: string) {
    super();
  }
}
