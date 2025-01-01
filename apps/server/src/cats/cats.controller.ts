import { DeleteCatDto } from './dto/delete-cat.dto';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  async findAll() {
    return await this.catsService.findAll();
  }
  @Patch()
  async update(@Body() updateCatDto: UpdateCatDto) {
    return await this.catsService.update(updateCatDto);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    const cat = this.catsService.create(createCatDto);
    return cat;
  }
  @Delete()
  async delete(@Body() deleteCatDto: DeleteCatDto) {
    const cat = this.catsService.delete(deleteCatDto);
    return cat;
  }
}
