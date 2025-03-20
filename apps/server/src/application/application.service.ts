import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Application, GetApplicationResponse, GetApplicationsDto, Job, ResumeScore } from "@repo/types";
import { Model } from "mongoose";
import { ResumeSchema } from "src/langchain/resume.schema";
import { calcResumeScore } from "src/utils/calcResumeScore";
import { z } from "zod";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(ResumeScore.name) private resumeScoreModel: Model<ResumeScore>,
    @InjectModel(Application.name) private applicationModel: Model<Application>,
    @InjectModel(Job.name) private jobModel: Model<Job>
  ) {}
  async createApplication(dto: { resume_url: string; resumeFileName: string; jobId: string }) {
    const newApplication = await this.applicationModel.create({
      resume_url: dto.resume_url,
      resume_file_name: dto.resumeFileName,
      job: dto.jobId,
    });
    return String(newApplication._id);
  }

  async updateParsedDetails(dto: {
    application_id: string;
    resume_url: string;
    job_id: string;
    resume_text: string;
    resume_json: z.infer<typeof ResumeSchema>;
  }) {
    await this.applicationModel
      .findByIdAndUpdate(dto.application_id, {
        _id: dto.application_id,
        current_role: dto.resume_json.basics.current_role,
        education: dto.resume_json.education,
        email: dto.resume_json.basics.email,
        experience: dto.resume_json.experience,
        full_name: dto.resume_json.basics.full_name,
        phone: dto.resume_json.basics.phone,
        resume_text: dto.resume_text,
        resume_url: dto.resume_url,
        skills: dto.resume_json.skills,
        location: dto.resume_json.basics.location,
        profile: dto.resume_json.profiles,
      })
      .exec();
    //
  }

  async getApplications(dto: GetApplicationsDto) {
    const job_details = await this.jobModel.findById(dto.job_id).populate("scoring_criteria");

    if (!job_details) {
      throw new Error("job not found"); //TODO: implement custom error
    }

    const pageSize = 10;
    const filter: any = { job: dto.job_id };

    // Apply search filter
    if (dto.search_term) {
      const regex = { $regex: dto.search_term, $options: "i" };
      if (dto.search_by === "Name") {
        filter.full_name = regex;
      } else if (dto.search_by === "Location") {
        filter.location = regex;
      } else if (dto.search_by === "Role") {
        filter.current_role = regex;
      }
    }

    // Calculate total records if needed
    const total_records = await this.applicationModel.countDocuments(filter).exec();

    // Map dto.sort_by to the actual field name
    const sortFieldMap: Record<string, string> = {
      Name: "full_name",
      Experience: "experience",
      // "Resume Score": "resume_score", TODO:// Implement this later
    };
    const sortField = sortFieldMap[dto.sort_by] || "full_name";
    const sortOrder = dto.sort_order === "Asc" ? 1 : -1;

    const applications = await this.applicationModel
      .find(filter)
      .populate("resume_analysis")
      .sort({ [sortField]: sortOrder })
      .skip((dto.page_number - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const getApplicationsResponse = GetApplicationResponse.fromEntity(applications, total_records);

    return getApplicationsResponse;
  }

  async updateParseStatus(
    application_id: string,
    type: "parse" | "scoring",
    status: Application["parsing_status"]
  ) {
    const application = await this.applicationModel.findById(application_id);
    if (!application) {
      throw new Error("Application not found");
    }
    if (type == "parse") {
      application.parsing_status = status;
    } else {
      application.scoring_status = status;
    }
    await application.save();
  }
}
