import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { RecruiterService } from './recruiter.service';

@Controller('recruiter')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Get(':id')
  async find(@Param('id') recruiter_id: string) {
    return await this.recruiterService.find(recruiter_id);
  }

  @Post()
  async create(@Body() createRecruiterDto: CreateRecruiterDto) {
    return await this.recruiterService.create(createRecruiterDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.recruiterService.remove({
      id,
    });
  }
  async update(
    @Param('id') recruiter_id: string,
    @Body() updateRecruiterDto: Partial<CreateRecruiterDto>,
  ) {
    return await this.recruiterService.update(recruiter_id, updateRecruiterDto);
  }
}
