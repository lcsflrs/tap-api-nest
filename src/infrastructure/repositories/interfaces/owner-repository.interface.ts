import { Owner } from "@domain/owner/owner.aggregate";

export interface IOwnerRepository {
  save(owner: Owner): Promise<void>;
  findById(id: number): Promise<Owner | null>;
  findByDocument(document: string): Promise<Owner | null>;
  findByAccessUserId(accessUserId: number): Promise<Owner | null>;
  findByAccessUserIdWithStores(accessUserId: number): Promise<Owner | null>;
  updateIoCustomerId(ownerId: number, ioCustomerId: string): Promise<void>;
}
