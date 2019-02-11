import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { PhotoService } from './services/photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from './entity/photo.entity';
import { PhotoRepository } from './repository/photo.repository';
import { ValidationPipe } from '../core/pipes/validation.pipe';
import { AllExceptionFilter } from '../core/exceptions/all-exception.filter';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, PhotoRepository])],
  controllers: [PhotoController],
  providers: [
    PhotoService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class PhotoModule {}