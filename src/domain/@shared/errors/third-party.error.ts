import { ApplicationError } from "./application-error.protocol";

export class ThirdPartyError extends Error implements ApplicationError {
  public readonly context?: unknown;

  constructor(gatewayName: string, message: string, context?: unknown) {
    super(
      `${gatewayName} - ${message}${context ? ` | Context: ${context}` : ""}`,
    );
    this.name = `${gatewayName}ThirdPartyError`;
    this.context = context;
  }
}
