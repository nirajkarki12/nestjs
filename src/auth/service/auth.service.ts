import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { UserService } from '../../user/service/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async createToken(id: number, username: string) {
    const expiresIn = 60 * 60;
    const secretOrKey = 'secret';
    const user = { username };
    const token = jwt.sign(user, secretOrKey, { expiresIn });

    return { token };
  }

  async validateUser(signedUser): Promise<boolean> {
    if (signedUser&&signedUser.username) {
      return Boolean(this.userService.getUserByUsername(signedUser.username));
    }

    return false;
  }
}