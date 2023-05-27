import { BaseEntity } from "src/utils/baseEntity";
import { Column, Entity } from "typeorm";

@Entity("playing")
export class Playing extends BaseEntity {
  @Column({ type: String, nullable: false, default: "" })
  userId: string;

  @Column({ type: String, nullable: false, default: "" })
  winner;

  @Column({ type: String, nullable: false, default: "" })
  player;

  @Column({ type: String, nullable: false, default: "" })
  bot;

  @Column({ type: Number, nullable: false, default: 0 })
  score;
}
