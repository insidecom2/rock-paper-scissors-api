import { TypeOrmModuleOptions } from "@nestjs/typeorm";
require("dotenv");

export const config: TypeOrmModuleOptions = {
  type: "mysql",
  host: "",
  username: "",
  password: "",
  port: 3306,
  database: "",
  synchronize: true,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  migrationsTableName: "migrations_typeorm",
  migrationsRun: true,
};
