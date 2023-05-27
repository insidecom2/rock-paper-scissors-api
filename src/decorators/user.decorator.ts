import {
  ExecutionContext,
  Injectable,
  createParamDecorator,
} from "@nestjs/common";

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return {
      userId: req.headers["x-user-id"],
    };
  }
);

export class UserDTO {
  userId: string;
}
