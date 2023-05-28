import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UserDTO, UserDecorator } from "src/decorators/user.decorator";
import { UserGuard } from "src/guards/user.guard";
import { PlayingService } from "./playing.service";
import { PlayingDTO } from "./dtos/playing.dto";

@Controller("playing")
@UseGuards(UserGuard)
export class PlayingController {
  constructor(private readonly playingService: PlayingService) {}

  @Post()
  async create(@UserDecorator() user: UserDTO, @Body() playingDto: PlayingDTO) {
    const userId = user.userId;
    try {
      const retrunData = await this.playingService.create(
        userId,
        playingDto.playerChoosed
      );
      return { status: "OK", data: retrunData };
    } catch (error) {
      throw new HttpException("error", 500, error);
    }
  }

  @Get("highscore")
  async getHighScore() {
    try {
      const retrunData = await this.playingService.getHighScore();
      return { status: "OK", data: retrunData };
    } catch (error) {
      throw new HttpException("Cannot get high score", 500, error);
    }
  }

  @Get("playerscore")
  async getPlayerScore(@UserDecorator() user: UserDTO) {
    try {
      const userId = user.userId;
      const retrunData = await this.playingService.getPlayerScore(userId);
      return { status: "OK", data: retrunData };
    } catch (error) {
      throw new HttpException("Cannot get player user", 500, error);
    }
  }
}
