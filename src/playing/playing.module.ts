import { Module } from "@nestjs/common";
import { PlayingController } from "./playing.controller";
import { Playing } from "./entities/playing.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayingService } from "./playing.service";
import { UserService } from "src/user/user.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Playing]), UserModule],
  controllers: [PlayingController],
  providers: [PlayingService],
})
export class PlayingModule {}
