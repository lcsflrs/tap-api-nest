import { AccessUser } from "@domain/access-user/access-user.aggregate";
import { AccessUserID } from "@domain/access-user/access-user-id.value";

export interface IAccessUserRepository {
  create(accessUser: AccessUser): Promise<void>;
  save(accessUser: AccessUser): Promise<void>;
  findById(id: AccessUserID): Promise<AccessUser | null>;
  findByEmail(email: string): Promise<AccessUser | null>;
  delete(id: AccessUserID): Promise<void>;
}
