import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { Connection } from 'typeorm';
import * as passport from 'passport';

import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PhotoModule,
    UserModule,
    AuthModule
  ],
})
export class AppModule implements NestModule {
  constructor(
    private readonly connection: Connection,
  ){}

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(
        { path: '/photo/', method: RequestMethod.ALL }
      );
  }
}
