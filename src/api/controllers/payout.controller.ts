import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { PayoutService } from "../../application/services/payout.service";
import type {
  CreatePayoutInput,
  FindPayoutByIdInput,
  FindManyPayoutInput,
  MarkPayoutPaidInput,
  AddItemToPayoutInput,
} from "../../application/dtos/payout-dtos";

@Controller("payouts")
export class PayoutController {
  constructor(private readonly payoutService: PayoutService) {}

  @Post()
  async create(@Body() input: CreatePayoutInput) {
    return this.payoutService.createPayout(input);
  }

  @Get(":id")
  async findById(@Param() params: FindPayoutByIdInput) {
    return this.payoutService.findPayoutById(params);
  }

  @Get()
  async findMany(@Query() query: FindManyPayoutInput) {
    return this.payoutService.findManyPayouts(query);
  }

  @Patch(":id/paid")
  async markAsPaid(
    @Param() params: MarkPayoutPaidInput,
    @Body() body: Omit<MarkPayoutPaidInput, "id">,
  ) {
    const input: MarkPayoutPaidInput = {
      id: params.id,
      ...body,
    };

    return this.payoutService.markPayoutAsPaid(input);
  }

  @Patch(":id/items")
  async addItem(
    @Param() params: AddItemToPayoutInput,
    @Body() body: Omit<AddItemToPayoutInput, "id">,
  ) {
    const input: AddItemToPayoutInput = {
      id: params.id,
      ...body,
    };

    return this.payoutService.addItemToPayout(input);
  }
}
