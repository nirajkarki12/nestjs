import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Photo } from '../entity/photo.entity';
import { PhotoRepository } from '../repository/photo.repository';
import { CreatePhotoDto } from '../dto/create-photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoRepository)
    private readonly photoRepository: PhotoRepository,
  ) {}

  async findAll(): Promise<CreatePhotoDto[]> {
    return await this.photoRepository.findAll();
  }

  async createPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return await this.photoRepository.createAndSave(createPhotoDto);
  }
}