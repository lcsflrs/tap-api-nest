import { Product } from "@domain/product/product.aggregate";

export interface IProductRepository {
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByIds(ids: number[]): Promise<Product[]>;
}
