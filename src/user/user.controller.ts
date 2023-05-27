import { Controller, HttpException, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create() {
    try {
      return { status: "OK", data: await this.userService.create() };
    } catch (error) {
      throw new HttpException("Cannot create user", 500);
    }
  }

  //   @Get()
  //   @UseGuards(UserGuard)
  //   async getUser(@UserDecorator() user: UserDTO) {}
}
