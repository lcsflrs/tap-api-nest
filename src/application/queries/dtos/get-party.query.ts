import { Query } from "@nestjs/cqrs";

export class GetPartyQuery extends Query<{
  id: number;
  name: string;
  date: string;
  time: string;
  address: string | null;
  stock: {
    id: number;
    name: string;
    price: number;
    dosage: string;
    containerType: string;
    productType: string;
  }[];
}> {
  constructor(public readonly partyId: number) {
    super();
  }
}
