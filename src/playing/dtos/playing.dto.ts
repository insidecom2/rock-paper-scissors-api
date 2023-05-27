import { IsNotEmpty } from "class-validator";

export class PlayingDTO {
  @IsNotEmpty()
  playerChoosed: string;
}
