import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  CreateJobDto,
  GetJobResponse,
  GetScoringSettingsResponse,
  Job,
  ScoringCriteria,
  UpdateJobDto,
} from "@repo/types";
import { Model } from "mongoose";
import { JwtPayload } from "src/auth/strategies/accessToken.strategy";
import { AccessTokenGuard } from "src/common/guards/access-token.guard";
import { GetUser } from "src/decorators/user.decorator";

import { JobService } from "./job.service";

@ApiTags("job")
@UseGuards(AccessTokenGuard)
@Controller("job")
export class JobController {
  constructor(
    private readonly jobService: JobService,
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(ScoringCriteria.name) private ScoringCritModel: Model<ScoringCriteria>
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: "The job has been successfully created.",
    type: GetJobResponse,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async create(@Body() createJobDto: CreateJobDto, @GetUser() user: JwtPayload): Promise<GetJobResponse> {
    const newJob = await this.jobService.createJob(createJobDto, user.sub);
    return GetJobResponse.fromEntity(newJob);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "Return all jobs.",
    type: [GetJobResponse],
  })
  async findAll(@GetUser() user: JwtPayload): Promise<GetJobResponse[]> {
    const jobs = await this.jobModel.find({
      recruiter: user.sub,
    });
    return jobs.map((job) => GetJobResponse.fromEntity(job));
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "Return a job by id.",
    type: GetJobResponse,
  })
  @ApiResponse({ status: 404, description: "Job not found." })
  async findOne(@Param("id") id: string, @GetUser() recruiter: JwtPayload): Promise<GetJobResponse> {
    const job = await this.jobModel.findOne({
      _id: id,
      recruiter: recruiter.sub,
    });
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
    const job = await this.jobModel.findByIdAndUpdate(id, updateJobDto);
    if (!job) {
      throw new NotFoundException("Job not found");
    }
    return GetJobResponse.fromEntity(job);
  }

  @Patch(":id/scoring-criteria")
  @ApiResponse({
    status: 204,
    description: "The scoring prompt has been successfully updated.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async createScoringPrompt(
    @Param("id") jobId: string,
    @Body() createScoringPromptDto: { scoringPrompt: string }
  ) {
    await this.jobService.updateScoringCriteria(jobId, createScoringPromptDto.scoringPrompt);
    return;
  }

  @Get(":id/scoring-criteria")
  @ApiResponse({
    status: 200,
    description: "The scoring prompt has been returned.",
    type: [GetScoringSettingsResponse],
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async getScoringCriteria(@Param("id") jobId: string): Promise<GetScoringSettingsResponse[]> {
    const scoringCriteria = await this.ScoringCritModel.find({ job: jobId });
    return scoringCriteria.map((sc) => GetScoringSettingsResponse.fromEntity(sc));
  }
}
