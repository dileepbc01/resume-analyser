import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateJobDto, Job, ScoringCriteria } from "@repo/types";
import { Model } from "mongoose";
import { LangchainService } from "src/langchain/langchain.service";
import { defaultScoringCriteria } from "src/utils/defaultScoringCriteria";

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(ScoringCriteria.name) private ScoringCritModel: Model<ScoringCriteria>,
    private langchainService: LangchainService
  ) {}

  async createJob(createJobDto: CreateJobDto, recruiterId: string) {
    const scoringcrit = await this.ScoringCritModel.create({
      criterias: defaultScoringCriteria.criterias,
      scoring_instructions: defaultScoringCriteria.scoring_instructions,
    });
    const job = await this.jobModel.create({
      ...createJobDto,
      recruiter: recruiterId,
      scoring_criteria: scoringcrit._id,
    });

    return job;
  }

  async updateScoringCriteria(jobId: string, CriteriaString: string) {
    await this.ScoringCritModel.deleteOne({
      job: jobId,
    });
    const jobDetails = await this.jobModel.findById(jobId).populate("scoringCriteria");

    if (!jobDetails) throw new Error("Job not found");
    const structuredScoreSetting = await this.langchainService.getStructedScoreSettings(CriteriaString);

    await this.ScoringCritModel.findByIdAndUpdate(jobDetails.scoring_criteria._id, {
      scoring_instructions: CriteriaString,
      job: jobId,
      criterias: structuredScoreSetting.criteria.map((criteria, idx) => ({
        criteria_name: criteria.criteria_name,
        importance: criteria.importance,
        order: idx,
        parameters: criteria.parameters,
      })),
      version: jobDetails.scoring_criteria.version + 1,
    });
  }
}
