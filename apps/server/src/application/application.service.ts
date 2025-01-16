import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Application } from "schema/application.schema";
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
    console.log("application_id", dto.application_id);
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
}
