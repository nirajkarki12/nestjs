import {EntityRepository, AbstractRepository} from "typeorm";
import * as bcrypt from 'bcrypt';

import {User} from "../entity/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  private saltRounds = 10;

  findAll(){
    return this.repository.find();
  }

  async createAndSave(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    user.password = await this.getHash(createUserDto.password);
    user.email = createUserDto.email;
    return this.manager.save(user);
  }

  findByUsername(username: string) {
    return this.repository.findOne({ username });
  }

  async getHash(password: string|undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

}