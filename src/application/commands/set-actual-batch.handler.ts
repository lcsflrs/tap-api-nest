import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { SetActualBatchCommand } from "./dtos/set-actual-batch.command";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@CommandHandler(SetActualBatchCommand)
export class SetActualBatchHandler implements ICommandHandler<SetActualBatchCommand> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(command: SetActualBatchCommand) {
    const { partyId, actualBatchId } = command;

    const party = await this.prisma.party.findUnique({
      where: { id: partyId },
    });

    if (!party) {
      throw new Error("Party not found");
    }

    await this.prisma.ingressBatch.updateMany({
      where: { partyId },
      data: { isActive: false },
    });

    if (actualBatchId) {
      await this.prisma.ingressBatch.update({
        where: { id: actualBatchId },
        data: { isActive: true },
      });
    }

    return { actualBatchId };
  }
}
