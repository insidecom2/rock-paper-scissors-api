import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { PlayingModule } from "./playing/playing.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "./configs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, PlayingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
