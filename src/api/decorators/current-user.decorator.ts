import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (
    data: keyof NonNullable<Express.Request["user"]> | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest<Express.Request>();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
