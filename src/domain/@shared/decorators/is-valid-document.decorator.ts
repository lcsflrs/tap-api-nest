import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { Cnpj } from "@domain/@shared/value-objects/cnpj.value";
import { Cpf } from "@domain/@shared/value-objects/cpf.value";

export function IsValidDocument(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "isValidDocument",
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
          } catch {}

          try {
            Cpf.create(value);
            return true;
          } catch {
            return false;
          }
        },
      },
    });
  };
}
