import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playing } from "./entities/playing.entity";
import { Repository } from "typeorm";
import { PLAY_ACTION } from "src/consts/commons";

export interface PlayingRes {
  userId: string;
  playerscore: number;
  highscore: number;
  winner: string;
  bot: string;
  player: string;
}
@Injectable()
export class PlayingService {
  constructor(
    @InjectRepository(Playing) private playingRepo: Repository<Playing>
  ) {}

  async create(userId: string, playingChoosed: string): Promise<PlayingRes> {
    try {
      const { winner, bot } = this.getWinner(playingChoosed);
      const getLastedScore = await this.getPlayerScore(userId);
      let currentScore = getLastedScore.player_score;
      if (winner === "player") {
        currentScore = getLastedScore.player_score + 1;
      } else if (winner === "bot") {
        currentScore = 0;
      }

      if (winner !== "no") {
        const create: Playing = this.playingRepo.create({
          userId: userId,
          player: playingChoosed,
          bot: bot,
          winner: winner,
          score: currentScore,
        });
        await this.playingRepo.save(create);
      }
      const getHighScore = await this.getHighScore();
      const response: PlayingRes = {
        userId: userId,
        playerscore: currentScore,
        highscore: getHighScore.high_score,
        winner: winner,
        bot: bot,
        player: playingChoosed,
      };
      return response;
    } catch (error) {
      console.log(error);
      throw new HttpException("", 500, error);
    }
  }

  async getHighScore(): Promise<{ high_score: number }> {
    const score = await this.playingRepo.find({
      select: {
        score: true,
      },
      order: {
        score: "DESC",
      },
    });

    return {
      high_score: score[0].score,
    };
  }

  async getPlayerScore(userId: string): Promise<{ player_score: number }> {
    const score = await this.playingRepo.findOne({
      where: {
        userId: userId,
      },
      order: { created_at: "DESC" },
    });
    return {
      player_score: score ? (await score).score : 0,
    };
  }

  getWinner(playingChoosed: string) {
    const mockData: string[] = [
      PLAY_ACTION.ROCK,
      PLAY_ACTION.PAPER,
      PLAY_ACTION.SCISSORS,
    ];
    const rndInt: number = Math.floor(Math.random() * 3) + 1;
    const bot = mockData[rndInt - 1];
    const winner = this.PlayingLogic({ player: playingChoosed, bot });

    return {
      winner,
      bot,
    };
  }

  PlayingLogic({ player, bot }: { player: string; bot: string }) {
    let winner = "";
    if (player === bot) {
      winner = "no";
    } else if (player === PLAY_ACTION.ROCK) {
      if (bot === PLAY_ACTION.PAPER) {
        winner = "bot";
      } else {
        winner = "player";
      }
    } else if (player === PLAY_ACTION.SCISSORS) {
      if (bot === PLAY_ACTION.ROCK) {
        winner = "bot";
      } else {
        winner = "player";
      }
    } else if (player === PLAY_ACTION.PAPER) {
      if (bot === PLAY_ACTION.SCISSORS) {
        winner = "bot";
      } else {
        winner = "player";
      }
    }
    return winner;
  }
}
