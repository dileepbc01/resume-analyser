import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { GetJobResponse } from './response/get-jobs.response';

@ApiTags('job')
@UseGuards(AccessTokenGuard)
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The job has been successfully created.', type: GetJobResponse })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createJobDto: CreateJobDto): Promise<GetJobResponse> {
    return this.jobService.create(createJobDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all jobs.', type: [GetJobResponse] })
  async findAll(): Promise<GetJobResponse[]> {
    return this.jobService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a job by id.', type: GetJobResponse })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  async findOne(@Param('id') id: string): Promise<GetJobResponse> {
    const job = await this.jobService.findOne({ id });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The job has been successfully updated.', type: GetJobResponse })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto): Promise<GetJobResponse> {
    const job = await this.jobService.update(id, updateJobDto);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  @Get('archive')
  @ApiResponse({ status: 200, description: 'The job has been successfully archived.', type: GetJobResponse })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  async remove(@Param('id') id: string): Promise<GetJobResponse> {
    const job = await this.jobService.archive(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }
}
