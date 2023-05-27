import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";
import { getDateThai } from "./date";

export class BaseEntity {
  // auto incressment
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
