import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Application } from "@repo/types";
import { Model } from "mongoose";
import { ResumeSchema } from "src/langchain/resume.schema";
import { z } from "zod";

@Injectable()
export class ApplicationService {
  constructor(@InjectModel(Application.name) private applicationModel: Model<Application>) {}
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
  async getApplicationsByJobId(jobId: string) {
    const applications = await this.applicationModel
      .find({
        job: jobId,
      })
      .exec();
    return applications;
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
