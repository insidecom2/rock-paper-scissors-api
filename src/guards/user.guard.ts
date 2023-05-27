import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.headers["x-user-id"];
    if (!userId) {
      return false;
    }

    const getUser = await this.userService.getUser(userId);
    if (!getUser) {
      return false;
    }

    return true;
  }
}
