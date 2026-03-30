import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { LoginOwnerDto } from "../dtos/auth/login-owner.dto";
import { GoogleSignInDto } from "../dtos/auth/google-sign-in.dto";
import { RegisterPendentDataDto } from "../dtos/auth/register-pendent-data.dto";
import { ChangePasswordDto } from "../dtos/auth/change-password.dto";
import { LoginOwnerCommand } from "@application/commands/dtos/login-owner.command";
import { GoogleSignInCommand } from "@application/commands/dtos/google-sign-in.command";
import { RegisterPendentDataCommand } from "@application/commands/dtos/register-pendent-data.command";
import { ChangePasswordCommand } from "@application/commands/dtos/change-password.command";
import { StoreOwnerGuard } from "@api/guards/store-owner.guard";
import { CurrentUser } from "@api/decorators/current-user.decorator";
import type { CurrentUserType } from "@api/@types/current-user.type";

@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("login/owner")
  async loginOwner(@Body() body: LoginOwnerDto) {
    return this.commandBus.execute(
      new LoginOwnerCommand(body.email, body.password),
    );
  }

  @Post("signin/google")
  async googleSignIn(@Body() body: GoogleSignInDto) {
    return this.commandBus.execute(
      new GoogleSignInCommand(body.fullName, body.email),
    );
  }

  @Post("signin/pendent-data")
  async registerPendentData(
    @Body() body: RegisterPendentDataDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new RegisterPendentDataCommand(user.id!, body.document, body.phone),
    );
  }

  @Post("login/first-access/change-password")
  @UseGuards(StoreOwnerGuard)
  async changePassword(@Body() body: ChangePasswordDto) {
    return this.commandBus.execute(
      new ChangePasswordCommand(Number(body.accessUserId), body.newPassword),
    );
  }
}
