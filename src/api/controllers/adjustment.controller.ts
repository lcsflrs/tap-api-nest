import { Controller, Post, Get, Body, Param, Query } from "@nestjs/common";
import { AdjustmentService } from "../../application/services/adjustment.service";
import type {
  CreateAdjustmentInput,
  FindAdjustmentByIdInput,
  FindManyAdjustmentsInput,
} from "../../application/dtos/adjustment-dtos";

@Controller("adjustments")
export class AdjustmentController {
  constructor(private readonly adjustmentService: AdjustmentService) {}

  @Post()
  async create(@Body() input: CreateAdjustmentInput) {
    return this.adjustmentService.createAdjustment(input);
  }

  @Get(":id")
  async findById(@Param() params: FindAdjustmentByIdInput) {
    return this.adjustmentService.findAdjustmentById(params);
  }

  @Get()
  async findMany(@Query() query: FindManyAdjustmentsInput) {
    return this.adjustmentService.findManyAdjustments(query);
  }
}
