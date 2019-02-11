import { Controller, Get, Req, Res, Post, Body, HttpStatus } from '@nestjs/common';

import { PhotoService } from './services/photo.service';
import { PhotoRepository } from "./repository/photo.repository";
import { Photo } from './entity/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  findAll(@Req() req, @Res() res) {
    this.photoService.findAll()
    .then((data) => {
      return res.status(HttpStatus.OK).send(data);
    })
    .catch((error) => {
      return res.status(HttpStatus.FORBIDDEN).send(error);
    });
  }

  @Post()
  async create(@Body() createPhotoDto: CreatePhotoDto, @Res() res){
    var photo = this.photoService.createPhoto(createPhotoDto);
    res.status(HttpStatus.CREATED).json({ message: 'Photo is created'});
  }
}
