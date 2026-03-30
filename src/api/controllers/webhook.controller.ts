import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { IopayWebhookDto } from "@api/dtos/webhook/iopay-webhook.dto";
import { ConfirmPixPaymentCommand } from "@application/commands/dtos/confirm-pix-payment.command";

@Controller()
export class WebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("/webhook/iopay")
  @HttpCode(200)
  async iopayWebhook(@Body() body: IopayWebhookDto) {
    if (body.type !== "transaction.succeeded" || body.status !== "succeeded") {
      throw new Error("Invalid event type or status");
    }

    return this.commandBus.execute(
      new ConfirmPixPaymentCommand(
        body.id,
        body.reference_id,
        body.sign_confirm,
        body.io_seller_id,
      ),
    );
  }
}
