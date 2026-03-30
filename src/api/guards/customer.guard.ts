import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import type { Request } from "express";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";

type CustomerJwtPayload = {
  user?: {
    id?: number;
  };
};

@Injectable()
export class CustomerGuard implements CanActivate {
  constructor(
    @Inject("JwtService")
    private readonly jwtService: IJwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error("No token provided");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      throw new Error("Unauthorized");
    }

    const decoded = (await this.jwtService.verify(token)) as CustomerJwtPayload;

    if (!decoded?.user?.id) {
      throw new Error("Unauthorized");
    }

    request.user = {
      customerId: decoded.user.id,
      id: decoded.user.id,
    };

    return true;
  }
}
