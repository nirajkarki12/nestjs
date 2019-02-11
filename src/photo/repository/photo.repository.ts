import {EntityRepository, AbstractRepository} from "typeorm";

import { Photo } from "../entity/photo.entity";
import { CreatePhotoDto } from "../dto/create-photo.dto";

@EntityRepository(Photo)
export class PhotoRepository extends AbstractRepository<Photo> {

   findAll(){
      return this.repository.find();
   }

   createAndSave(createPhotoDto: CreatePhotoDto) {
      const photo = new Photo();
      photo.name = createPhotoDto.name;
      photo.description = createPhotoDto.description;
      photo.file = createPhotoDto.file;
      return this.manager.save(photo);
   }

   findByName(name: string) {
      return this.repository.findOne({ name });
   }

}