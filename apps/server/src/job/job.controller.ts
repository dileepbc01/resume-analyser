import { InjectQueue } from "@nestjs/bullmq";
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
  UpdateScoringSliderDto,
} from "@repo/types";
import { Queue } from "bullmq";
import { Model } from "mongoose";
import { JwtPayload } from "src/auth/strategies/accessToken.strategy";
import { AccessTokenGuard } from "src/common/guards/access-token.guard";
import { GetUser } from "src/decorators/user.decorator";
import { AppQueueEnum, QueuePayload } from "src/queues/app-queues";

import { JobService } from "./job.service";

@ApiTags("job")
@UseGuards(AccessTokenGuard)
@Controller("job")
export class JobController {
  constructor(
    private readonly jobService: JobService,
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(ScoringCriteria.name) private ScoringCritModel: Model<ScoringCriteria>,
    @InjectQueue(AppQueueEnum.RESUME_RESCORE)
    private readonly resumeReScoringQueue: Queue<QueuePayload["resume-re-score"]>
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

  // TODO: future req
  // @Patch(":id/scoring-criteria")
  // @ApiResponse({
  //   status: 204,
  //   description: "The scoring prompt has been successfully updated.",
  // })
  // @ApiResponse({ status: 400, description: "Bad Request." })
  // async createScoringPrompt(
  //   @Param("id") jobId: string,
  //   @Body() createScoringPromptDto: { scoringPrompt: string }
  // ) {
  //   await this.jobService.updateScoringCriteria(jobId, createScoringPromptDto.scoringPrompt);
  //   return;
  // }

  @Patch(":id/scoring-slider")
  @ApiResponse({
    status: 204,
    description: "The scoring prompt has been successfully updated.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async updateResumeScoringSlider(
    @Param("id") jobId: string,
    @Body() updatedCriteriasImp: UpdateScoringSliderDto
  ): Promise<void> {
    const jobDetails = await this.jobModel.findById(jobId).populate("scoring_criteria");

    if (!jobDetails) {
      throw new NotFoundException("Job not found");
    }
    const jobScoringCrit = await this.ScoringCritModel.findById(jobDetails.scoring_criteria._id);

    if (!jobScoringCrit) {
      throw new NotFoundException("Scoring Criteria not found");
    }

    jobScoringCrit.criterias = jobScoringCrit.criterias.map((criteria) => {
      const imp = updatedCriteriasImp.criterias.find((c) => c.criteriaName === criteria.criteria_name);
      if (!imp) {
        throw new NotFoundException("Criteria not found ");
      }
      return {
        ...criteria,
        importance: imp.importance,
      };
    });

    await jobScoringCrit.save();

    this.resumeReScoringQueue.add("resume-rescore", {
      jobId: jobDetails.id,
    });
    return;
  }

  //

  @Get(":id/scoring-criteria")
  @ApiResponse({
    status: 200,
    description: "The scoring prompt has been returned.",
    type: [GetScoringSettingsResponse],
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async getScoringCriteria(@Param("id") jobId: string) {
    const jobDetails = await this.jobModel.findById(jobId).populate("scoring_criteria");
    if (!jobDetails) {
      throw new NotFoundException("Job not found");
    }
    return GetScoringSettingsResponse.fromEntity(jobDetails.scoring_criteria);
  }
}
