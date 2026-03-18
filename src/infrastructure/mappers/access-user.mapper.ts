import { AccessUser } from "@domain/access-user/access-user.aggregate";

export class AccessUserMapper {
  static toDomain(acessUser: any): AccessUser {
    return AccessUser.fromJSON({
      id: acessUser.id,
      name: acessUser.name,
      email: acessUser.email,
      phone: acessUser.phone,
      document: acessUser.document,
      password: acessUser.password,
      emailVerified: acessUser.emailVerified,
      phoneVerified: acessUser.phoneVerified,
      isFirstAccess: acessUser.firstAccess,
      emailCodeVerification: acessUser.emailCodeVerification,
      birthdate: acessUser.birthdate,
    });
  }

  static toPersistence(accessUser: AccessUser) {
    const json = accessUser.toJSON();

    return {
      id: json.id,
      name: json.name,
      email: json.email,
      phone: json.phone,
      document: json.document,
      password: json.password,
      emailVerified: json.emailVerified,
      phoneVerified: json.phoneVerified,
      firstAccess: json.isFirstAccess,
      emailCodeVerification: json.emailCodeVerification,
      birthdate: json.birthdate,
    };
  }
}
