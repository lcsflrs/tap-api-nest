import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { Cnpj } from "@domain/@shared/value-objects/cnpj.value";

export function IsValidCNPJ(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "isValidCNPJ",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, _args: ValidationArguments) {
          if (typeof value !== "string") {
            return false;
          }

          try {
            Cnpj.create(value);
            return true;
          } catch {
            return false;
          }
        },
      },
    });
  };
}
