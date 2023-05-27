import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { returnApi } from "src/utils/response";
import { v4 as uuid } from "uuid";

interface CreateUser {
  userId: string;
}
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(): Promise<User> {
    const createUserData: CreateUser = {
      userId: this.generateUUID(),
    };
    try {
      const create: User = this.userRepo.create(createUserData);
      const createUser: User = await this.userRepo.save(create);
      if (createUser) {
        return createUser;
      }
      throw new HttpException("Cannot create user", 500);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async getUser(userId: string) {
    try {
      const getUser: User = await this.userRepo.findOneBy({ userId: userId });
      if (getUser) {
        return getUser;
      }
      return null;
    } catch (error) {
      return error;
    }
  }

  generateUUID(): string {
    return uuid();
  }
}
