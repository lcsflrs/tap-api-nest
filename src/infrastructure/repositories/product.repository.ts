import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IProductRepository } from "./interfaces/product-repository.interface";
import { Product } from "@domain/product/product.aggregate";
import { ProductMapper } from "@infrastructure/mappers/product.mapper";

const PRODUCT_INCLUDES = {
  productType: true,
  containerType: true,
  dosageUnit: true,
} as const;

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: PRODUCT_INCLUDES,
    });

    if (!product) {
      return null;
    }

    return ProductMapper.toDomain(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: PRODUCT_INCLUDES,
    });

    return products.map(ProductMapper.toDomain);
  }

  async findByIds(ids: number[]): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { id: { in: ids } },
      include: PRODUCT_INCLUDES,
    });

    return products.map(ProductMapper.toDomain);
  }
}
