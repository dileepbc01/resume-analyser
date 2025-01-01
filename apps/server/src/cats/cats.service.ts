import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from 'schema/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { DeleteCatDto } from './dto/delete-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async update(updateCatDto: UpdateCatDto): Promise<Cat> {
    const updatedCat = await this.catModel
      .findByIdAndUpdate(updateCatDto.id, {
        name: updateCatDto.name,
        age: updateCatDto.age,
        breed: updateCatDto.breed,
      })
      .exec();
    if (updatedCat !== null) {
      return updatedCat;
    }
    throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
  }

  async delete(deleteCatDto: DeleteCatDto): Promise<Cat> {
    const deletedCat = await this.catModel
      .findByIdAndDelete(deleteCatDto.id)
      .exec();
    if (deletedCat !== null) {
      return deletedCat;
    }
    throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
  }
}
