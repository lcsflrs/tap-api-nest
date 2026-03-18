import { Product } from "@domain/product/product.aggregate";

export class ProductMapper {
  static toDomain(product: any): Product {
    return Product.fromJSON({
      id: product.id,
      name: product.name,
      dosage: product.dosage,
      category: product.productType?.name ?? null,
      container: product.containerType?.name ?? null,
      measureUnit: product.dosageUnit?.name ?? null,
    });
  }
}
