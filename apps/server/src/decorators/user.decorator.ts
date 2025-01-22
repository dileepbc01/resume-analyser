import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayload } from "src/auth/strategies/accessToken.strategy";

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): JwtPayload => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
