import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { Cpf } from "@domain/@shared/value-objects/cpf.value";

export function IsValidCPF(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "isValidCPF",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, _args: ValidationArguments) {
          if (typeof value !== "string") {
            return false;
          }

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
