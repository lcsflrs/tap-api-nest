import { Injectable, Inject } from "@nestjs/common";
import type { IPayoutRepository } from "../repositories/interfaces/payout-repository.interface";
import type {
  CreatePayoutInput,
  CreatePayoutOutput,
  FindPayoutByIdInput,
  FindPayoutByIdOutput,
  FindManyPayoutInput,
  FindManyPayoutOutput,
  MarkPayoutPaidInput,
  MarkPayoutPaidOutput,
  AddItemToPayoutInput,
  AddItemToPayoutOutput,
} from "../dtos/payout-dtos";
import { Payout } from "../../domain/payout/payout.aggregate";
import { PayoutItem } from "../../domain/payout/payout-item.entity";
import { Money } from "../../domain/@shared/value-objects/money.value";
import { PayoutStatus } from "../../domain/@shared/value-objects/payout-status.value";
import { Uuid } from "../../domain/@shared/interfaces/uuid";

@Injectable()
export class PayoutService {
  constructor(
    @Inject("PayoutRepository")
    private readonly payoutRepository: IPayoutRepository,
  ) {}

  async createPayout(input: CreatePayoutInput): Promise<CreatePayoutOutput> {
    const gross = input.items.reduce(
      (total, item) => total + item.amountInCents,
      0,
    );
    const createdBy = new Uuid(input.createdBy);

    const payout = Payout.create(new Uuid(input.clientId), new Money(gross));

    input.items.forEach((item) => {
      const payoutItem = PayoutItem.create(
        payout.id,
        new Money(item.amountInCents),
        new Uuid(item.consumptionId),
      );

      payout.addItem(payoutItem);
    });

    await this.payoutRepository.save(payout);

    return {
      id: payout.getId().getValue(),
    };
  }

  async findPayoutById(
    input: FindPayoutByIdInput,
  ): Promise<FindPayoutByIdOutput> {
    const payout = await this.payoutRepository.findById(new Uuid(input.id));

    if (!payout) {
      throw new Error("Payout not found");
    }

    return {
      id: payout.getId().getValue(),
      clientId: payout.clientId.getValue(),
      createdAt: payout.createdAt,
      updatedAt: payout.updatedAt,
      status: payout.status.getValue(),
      items: payout.items.map((item) => ({
        id: item.getId().getValue(),
        amountInCents: item.amountInCents.getValue(),
        consumptionId: item.consumptionId.getValue(),
      })),
    };
  }

  async findManyPayouts(
    input: FindManyPayoutInput,
  ): Promise<FindManyPayoutOutput> {
    const status = input.status
      ? PayoutStatus.fromString(input.status)
      : undefined;

    const result = await this.payoutRepository.findMany(
      input.page,
      input.limit,
      input.clientId,
      status,
    );

    return {
      payouts: result.payouts.map((payout) => ({
        id: payout.getId().getValue(),
        clientId: payout.clientId.getValue(),
        createdAt: payout.createdAt,
        updatedAt: payout.updatedAt,
        status: payout.status.getValue(),
        items: payout.items.map((item) => ({
          id: item.getId().getValue(),
          amountInCents: item.amountInCents.getValue(),
          consumptionId: item.consumptionId.getValue(),
        })),
      })),
      totalPages: result.totalPages,
    };
  }

  async markPayoutAsPaid(
    input: MarkPayoutPaidInput,
  ): Promise<MarkPayoutPaidOutput> {
    const payout = await this.payoutRepository.findById(new Uuid(input.id));

    if (!payout) {
      throw new Error("Payout not found");
    }

    payout.markAsPaid(input.proofFileUrl);
    await this.payoutRepository.update(payout);

    return {
      id: payout.getId().getValue(),
    };
  }

  async addItemToPayout(
    input: AddItemToPayoutInput,
  ): Promise<AddItemToPayoutOutput> {
    const payout = await this.payoutRepository.findById(new Uuid(input.id));

    if (!payout) {
      throw new Error("Payout not found");
    }

    const payoutItem = PayoutItem.create(
      payout.id,
      new Money(input.amountInCents),
      new Uuid(input.consumptionId),
    );

    payout.addItem(payoutItem);

    await this.payoutRepository.update(payout);

    return {
      id: payout.getId().getValue(),
    };
  }
}
