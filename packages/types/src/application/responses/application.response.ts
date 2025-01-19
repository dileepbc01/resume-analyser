import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsString } from "class-validator";
import { Skill, Education, Experience, Profile, Application } from "../../schema/application.schema";

class SkillResponse {
  @ApiProperty({ description: "Name of the skill" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Level of the skill" })
  @IsString()
  level: number;

  static fromEntity(skill: Skill): SkillResponse {
    const dto = new SkillResponse();
    dto.name = skill.name;
    dto.level = skill.level;
    return dto;
  }
}

class EducationResponse {
  @ApiProperty({ description: "Institution name" })
  @IsString()
  institution: string;

  @ApiProperty({ description: "Field of study" })
  @IsString()
  field_of_study: string;

  @ApiProperty({ description: "Grade" })
  @IsString()
  grade: string;

  @ApiProperty({ description: "Type of education" })
  @IsString()
  type: string;

  @ApiProperty({ description: "Degree obtained" })
  @IsString()
  degree: string;

  @ApiProperty({ description: "Start date" })
  @IsString()
  start_date: string;

  @ApiProperty({ description: "End date" })
  @IsString()
  end_date: string;

  @ApiProperty({ description: "Currently studying" })
  @IsBoolean()
  is_currently_studying: boolean;

  @ApiProperty({ description: "Description" })
  @IsString()
  description: string;

  static fromEntity(education: Education): EducationResponse {
    const dto = new EducationResponse();
    dto.institution = education.institution;
    dto.field_of_study = education.field_of_study;
    dto.grade = education.grade;
    dto.type = education.type;
    dto.degree = education.degree;
    dto.start_date = education.start_date;
    dto.end_date = education.end_date;
    dto.is_currently_studying = education.is_currently_studying;
    dto.description = education.description;
    return dto;
  }
}

class ExperienceResponse {
  @ApiProperty({ description: "Job title" })
  @IsString()
  title: string;

  @ApiProperty({ description: "Employment type" })
  @IsString()
  employment_type: string;

  @ApiProperty({ description: "Location" })
  @IsString()
  location: string;

  @ApiProperty({ description: "Description" })
  @IsString()
  description: string;

  @ApiProperty({ description: "Location type" })
  @IsString()
  location_type: string;

  @ApiProperty({ description: "Start date" })
  @IsString()
  start_date: string;

  @ApiProperty({ description: "End date" })
  @IsString()
  end_date: string;

  @ApiProperty({ description: "Currently working" })
  @IsBoolean()
  is_currently_working: boolean;

  static fromEntity(experience: Experience): ExperienceResponse {
    const dto = new ExperienceResponse();
    dto.title = experience.title;
    dto.employment_type = experience.employment_type;
    dto.location = experience.location;
    dto.description = experience.description;
    dto.location_type = experience.location_type;
    dto.start_date = experience.start_date;
    dto.end_date = experience.end_date;
    dto.is_currently_working = experience.is_currently_working;
    return dto;
  }
}

class ProfileResponse {
  @ApiProperty({ description: "Profile name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Profile URL" })
  @IsString()
  url: string;

  static fromEntity(profile: Profile): ProfileResponse {
    const dto = new ProfileResponse();
    dto.name = profile.name;
    dto.url = profile.url;
    return dto;
  }
}

export class GetApplicationResponse {
  @ApiProperty({ description: "Application ID" })
  @IsString()
  id: string;

  @ApiProperty({ description: "Created At" })
  @IsString()
  createdAt: string;

  @ApiProperty({ description: "Updated At" })
  @IsString()
  updatedAt: string;

  @ApiProperty({ description: "Full name of the applicant" })
  @IsString()
  full_name: string;

  @ApiProperty({ description: "Resume file name" })
  @IsString()
  resume_file_name: string;

  @ApiProperty({ description: "Resume text" })
  @IsString()
  resume_text: string;

  @ApiProperty({ description: "Email of the applicant" })
  @IsString()
  email: string;

  @ApiProperty({ description: "Phone number of the applicant" })
  @IsString()
  phone: string;

  @ApiProperty({ description: "Current role of the applicant" })
  @IsString()
  current_role: string;

  @ApiProperty({ description: "Location of the applicant" })
  @IsString()
  location: string;

  @ApiProperty({ description: "Resume URL" })
  @IsString()
  resume_url: string;

  @ApiProperty({ description: "Skills of the applicant" })
  @IsArray()
  skills: SkillResponse[];

  @ApiProperty({ description: "Education details of the applicant" })
  @IsArray()
  education: EducationResponse[];

  @ApiProperty({ description: "Experience details of the applicant" })
  @IsArray()
  experience: ExperienceResponse[];

  @ApiProperty({ description: "Profile links of the applicant" })
  @IsArray()
  profile: ProfileResponse[];

  @ApiProperty({ description: "Job ID" })
  @IsString()
  job: string;

  static fromEntity(application: Application): GetApplicationResponse {
    const dto = new GetApplicationResponse();
    dto.id = application._id.toString();
    dto.full_name = application.full_name;
    dto.resume_file_name = application.resume_file_name;
    dto.resume_text = application.resume_text;
    dto.email = application.email;
    dto.phone = application.phone;
    dto.current_role = application.current_role;
    dto.location = application.location;
    dto.resume_url = application.resume_url;
    dto.skills = application.skills.map(SkillResponse.fromEntity);
    dto.education = application.education.map(EducationResponse.fromEntity);
    dto.experience = application.experience.map(ExperienceResponse.fromEntity);
    dto.profile = application.profile.map(ProfileResponse.fromEntity);
    dto.job = application.job.toString();
    dto.createdAt = application.created_at.toISOString();
    dto.updatedAt = application.updated_at.toISOString();
    return dto;
  }
}
