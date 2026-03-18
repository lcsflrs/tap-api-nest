import { AggregateRoot } from "@domain/@shared/interfaces/aggregate-root.abstract";
import { ProductID } from "./product-id.value";
import { ProductCategory } from "./product-category.value";
import { ProductContainer } from "./product-container.value";
import { UnitOfMeasure } from "./unit-of-measure.value";

export class Product extends AggregateRoot<ProductID> {
  constructor(
    id: ProductID,
    private readonly _name: string,
    private readonly _dosage: string,
    private readonly _category: ProductCategory | null,
    private readonly _container: ProductContainer | null,
    private readonly _measureUnit: UnitOfMeasure | null,
  ) {
    super(id);
  }

  static create(
    id: ProductID,
    name: string,
    dosage: string,
    category: ProductCategory | null,
    container: ProductContainer | null,
    measureUnit: UnitOfMeasure | null,
  ): Product {
    if (name.trim().length === 0) {
      throw new Error("Product name is required");
    }

    if (dosage.trim().length === 0) {
      throw new Error("Product dosage is required");
    }

    return new Product(id, name, dosage, category, container, measureUnit);
  }

  static fromJSON(json: ProductJSON): Product {
    return new Product(
      new ProductID(json.id),
      json.name,
      json.dosage,
      json.category ? ProductCategory.create(json.category) : null,
      json.container ? ProductContainer.create(json.container) : null,
      json.measureUnit ? UnitOfMeasure.create(json.measureUnit) : null,
    );
  }

  toJSON(): ProductJSON {
    return {
      id: this.id.getValue(),
      name: this._name,
      dosage: this._dosage,
      category: this._category?.getValue() ?? null,
      container: this._container?.getValue() ?? null,
      measureUnit: this._measureUnit?.getValue() ?? null,
    };
  }

  get name(): string {
    return this._name;
  }

  get dosage(): string {
    return this._dosage;
  }

  get category(): ProductCategory | null {
    return this._category;
  }

  get container(): ProductContainer | null {
    return this._container;
  }

  get measureUnit(): UnitOfMeasure | null {
    return this._measureUnit;
  }
}

export interface ProductJSON {
  id: number;
  name: string;
  dosage: string;
  category?: string | null;
  container?: string | null;
  measureUnit?: string | null;
}
