export interface IJwtService {
  sign(payload: Record<string, unknown>): Promise<string>;
  signWithTtl(
    payload: Record<string, unknown>,
    expiresIn: number,
  ): Promise<string>;
  verify(token: string): Promise<Record<string, unknown>>;
  decode(token: string): Record<string, unknown> | null;
}
