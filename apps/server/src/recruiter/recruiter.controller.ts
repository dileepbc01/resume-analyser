import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { RecruiterService } from './recruiter.service';

@Controller('recruiter')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Get()
  async find(@Query('id') recruiter_id: string) {
    return await this.recruiterService.find(recruiter_id);
  }

  @Post()
  async create(@Body() createRecruiterDto: CreateRecruiterDto) {
    return await this.recruiterService.create(createRecruiterDto);
  }
}
