import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import jwt from "jsonwebtoken";
import type { IJwtService } from "./jwt.interface";

@Injectable()
export class JwtService implements IJwtService {
  private readonly secret: string;
  private readonly expiresIn: number;

  constructor(private readonly configService: ConfigService) {
    this.secret = this.configService.get<string>("JWT_SECRET", "secret");
    this.expiresIn = 3600 * 24 * 30 * 3;
  }

  async sign(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  async signWithTtl(
    payload: Record<string, unknown>,
    expiresIn: number,
  ): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  async verify(token: string): Promise<Record<string, unknown>> {
    return jwt.verify(token, this.secret) as Record<string, unknown>;
  }

  decode(token: string): Record<string, unknown> | null {
    return jwt.decode(token) as Record<string, unknown> | null;
  }
}
