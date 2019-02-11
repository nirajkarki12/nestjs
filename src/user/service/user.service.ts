import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {

   constructor(
      @InjectRepository(UserRepository)
      private readonly userRepository: UserRepository
   ) {}

   async getUsers(): Promise<User[]> {
      return await this.userRepository.findAll();
   }

   async getUserByUsername(username: string): Promise<User> {
      return (await this.userRepository.findByUsername(username));
   }

   async createUser(user: CreateUserDto): Promise<User> {
      return this.userRepository.createAndSave(user);
   }

   async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
      return bcrypt.compare(password, hash);
   }
}