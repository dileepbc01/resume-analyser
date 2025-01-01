import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  async findAll() {
    return await this.catsService.findAll();
  }
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    const cat = this.catsService.create(createCatDto);
    return cat;
  }
}
