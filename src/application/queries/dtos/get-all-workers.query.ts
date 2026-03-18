import { Query } from "@nestjs/cqrs";

export class GetAllWorkersQuery extends Query<{
  workers: {
    workerId: number;
    shopId: number;
    name: string;
    expirationDate: Date;
    accessJwt: string;
    role: number;
  }[];
}> {
  constructor(public readonly shopId: number) {
    super();
  }
}
