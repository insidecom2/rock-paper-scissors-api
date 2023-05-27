import { BaseEntity } from "src/utils/baseEntity";
import { Column, Entity } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @Column({ type: String, nullable: false, default: "" })
  userId: string;
}
