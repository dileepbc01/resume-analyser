import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateJobDto, GetJobResponse, UpdateJobDto } from "@repo/types";
import { AccessTokenGuard } from "src/common/guards/access-token.guard";

import { JobService } from "./job.service";

@ApiTags("job")
@UseGuards(AccessTokenGuard)
@Controller("job")
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Post()
  @ApiResponse({
    status: 201,
    description: "The job has been successfully created.",
    type: GetJobResponse,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async create(@Body() createJobDto: CreateJobDto): Promise<GetJobResponse> {
    const newJob = await this.jobService.create(createJobDto);
    return GetJobResponse.fromEntity(newJob);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "Return all jobs.",
    type: [GetJobResponse],
  })
  async findAll(): Promise<GetJobResponse[]> {
    const jobs = await this.jobService.findAll();
    return jobs.map((job) => GetJobResponse.fromEntity(job));
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "Return a job by id.",
    type: GetJobResponse,
  })
  @ApiResponse({ status: 404, description: "Job not found." })
  async findOne(@Param("id") id: string): Promise<GetJobResponse> {
    const job = await this.jobService.findOne({ id });
    if (!job) {
      throw new NotFoundException("Job not found");
    }
    return GetJobResponse.fromEntity(job);
  }

  @Patch(":id")
  @ApiResponse({
    status: 200,
    description: "The job has been successfully updated.",
    type: GetJobResponse,
  })
  @ApiResponse({ status: 404, description: "Job not found." })
  async update(@Param("id") id: string, @Body() updateJobDto: UpdateJobDto): Promise<GetJobResponse> {
    const job = await this.jobService.update(id, updateJobDto);
    if (!job) {
      throw new NotFoundException("Job not found");
    }
    return GetJobResponse.fromEntity(job);
  }

  @Get("archive")
  @ApiResponse({
    status: 200,
    description: "The job has been successfully archived.",
    type: GetJobResponse,
  })
  @ApiResponse({ status: 404, description: "Job not found." })
  async remove(@Param("id") id: string): Promise<GetJobResponse> {
    const job = await this.jobService.archive(id);
    if (!job) {
      throw new NotFoundException("Job not found");
    }
    return GetJobResponse.fromEntity(job);
  }
}
