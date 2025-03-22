import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsString,IsObject, IsOptional, IsEnum, IsNotEmpty, } from "class-validator";
import { Skill, Education, Experience, Profile, Application } from "../../schema/application.schema";
import { Job } from "src/schema";

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
  fieldOfStudy: string;

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
  startDate: string;

  @ApiProperty({ description: "End date" })
  @IsString()
  endDate: string;

  @ApiProperty({ description: "Currently studying" })
  @IsBoolean()
  isCurrentlyStudying: boolean;

  @ApiProperty({ description: "Description" })
  @IsString()
  description: string;

  static fromEntity(education: Education): EducationResponse {
    const dto = new EducationResponse();
    dto.institution = education.institution;
    dto.fieldOfStudy = education.field_of_study;
    dto.grade = education.grade;
    dto.type = education.type;
    dto.degree = education.degree;
    dto.startDate = String(education.start_date);
    dto.endDate = String(education.end_date);
    dto.isCurrentlyStudying = education.is_currently_studying;
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
  employmentType: string;

  @ApiProperty({ description: "Location" })
  @IsString()
  location: string;

  @ApiProperty({ description: "Description" })
  @IsString()
  description: string;

  @ApiProperty({ description: "Location type" })
  @IsString()
  locationType: string;

  @ApiProperty({ description: "Start date" })
  @IsString()
  startDate: string;

  @ApiProperty({ description: "End date" })
  @IsString()
  endDate: string;

  @ApiProperty({ description: "Currently working" })
  @IsBoolean()
  isCurrentlyWorking: boolean;

  static fromEntity(experience: Experience): ExperienceResponse {
    const dto = new ExperienceResponse();
    dto.title = experience.title;
    dto.employmentType = experience.employment_type;
    dto.location = experience.location;
    dto.description = experience.description;
    dto.locationType = experience.location_type;
    dto.startDate = String(experience.start_date);
    dto.endDate = String(experience.end_date);
    dto.isCurrentlyWorking = experience.is_currently_working;
    return dto;
  }
}

class ProfileResponse {
  @ApiProperty({ description: "Profile name" })
  @IsString()
  network: string;

  @ApiProperty({ description: "Profile URL" })
  @IsString()
  url: string;

  static fromEntity(profile: Profile): ProfileResponse {
    const dto = new ProfileResponse();
    dto.network = profile.network;
    dto.url = profile.url;
    return dto;
  }
}

const STATUS_ENUMS = ["not_started", "processing", "completed", "failed"] as const;


type StatusEnum = (typeof STATUS_ENUMS)[number];

interface ErrorType {
  type: "server" | "client";
  message: string;
}

class JobProcessingStatus {
  @IsEnum(STATUS_ENUMS)
  @IsNotEmpty()
  status: StatusEnum; // Corrected enum type

  @IsNumber()
  @IsNotEmpty()
  percentage: number;

  @IsOptional()
  error: ErrorType | null;

  @IsNumber()
  @IsNotEmpty()
  retry_count: number;
}

class ParameterResponse {
  @ApiProperty({ description: "Parameter name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Score for the parameter" })
  @IsNumber()
  score: number;

  static fromEntity(param: any): ParameterResponse {
    const dto = new ParameterResponse();
    dto.name = param.name;
    dto.score = param.score;
    return dto;
  }
}

class ResumeScoreCriteriaResponse {
  @ApiProperty({ description: "Criteria name" })
  @IsString()
  criteriaName: string;

  @ApiProperty({ description: "Total score" })
  @IsNumber()
  totalScore: number;

  @ApiProperty({ description: "Justification" })
  @IsString()
  justification: string;

  @ApiProperty({ description: "Order" })
  @IsNumber()
  order: number;

  @ApiProperty({ description: "Parameters" })
  @IsArray()
  parameters: ParameterResponse[];

  static fromEntity(criteria: any): ResumeScoreCriteriaResponse {
    const dto = new ResumeScoreCriteriaResponse();
    dto.criteriaName = criteria.criteria_name;
    dto.totalScore = criteria.total_score;
    dto.justification = criteria.justification;
    dto.order = criteria.order;
    dto.parameters = criteria.parameters.map(ParameterResponse.fromEntity);
    return dto;
  }
}

class ResumeScoreResponse {
  @ApiProperty({ description: "Resume score criterias" })
  @IsArray()
  criterias: ResumeScoreCriteriaResponse[];

  static fromEntity(resumeScore: any): ResumeScoreResponse {
    const dto = new ResumeScoreResponse();
    dto.criterias = resumeScore.criterias.map(ResumeScoreCriteriaResponse.fromEntity);
    return dto;
  }
}

export class ApplicationResponse {

  @ApiProperty({description:"Serial number"})
  @IsNumber()
  slNo: number;
  
  @ApiProperty({ description: "Application Id" })
  @IsString()
  applicationId: string;

  @ApiProperty({ description: "Created At" })
  @IsString()
  createdAt: string;

  @ApiProperty({ description: "Updated At" })
  @IsString()
  updatedAt: string;

  @ApiProperty({ description: "Full name of the applicant" })
  @IsString()
  fullName: string;

  @ApiProperty({ description: "Resume file name" })
  @IsString()
  resumeFileName: string;

  @ApiProperty({ description: "Resume text" })
  @IsString()
  resumeText: string;

  @ApiProperty({ description: "Email of the applicant" })
  @IsString()
  email: string;

  @ApiProperty({ description: "Phone number of the applicant" })
  @IsString()
  phone: string;

  @ApiProperty({ description: "Current role of the applicant" })
  @IsString()
  currentRole: string;

  @ApiProperty({ description: "Location of the applicant" })
  @IsString()
  location: string;

  @ApiProperty({ description: "Resume URL" })
  @IsString()
  resumeUrl: string;

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

  @ApiProperty({})
  @IsObject()
  parsingStatus: JobProcessingStatus;

  @ApiProperty({})
  @IsObject()
  scoringStatus: JobProcessingStatus;

  @ApiProperty({ description: "Resume Analysis Score" })
  @IsOptional()
  resumeAnalysis: ResumeScoreResponse|null;

  @ApiProperty({ description: "Resume Analysis Score" })
  @IsOptional()
  resumeScore:number|null;


  @ApiProperty({ description: "Resume Analysis Score" })
  @IsOptional()
  scoreCriteriaVersion:number|null;


  static fromEntity(application: Application,slNo:number): ApplicationResponse {
    const dto = new ApplicationResponse();
    dto.applicationId = String(application._id);
    dto.slNo = slNo;
    dto.fullName = application.full_name;
    dto.resumeFileName = application.resume_file_name;
    dto.resumeText = application.resume_text;
    dto.email = application.email;
    dto.phone = application.phone;
    dto.currentRole = application.current_role;
    dto.location = application.location;
    dto.resumeUrl = application.resume_url;
    dto.skills = application.skills.map(SkillResponse.fromEntity);
    dto.education = application.education.map(EducationResponse.fromEntity);
    dto.experience = application.experience.map(ExperienceResponse.fromEntity);
    dto.profile = application.profile.map(ProfileResponse.fromEntity);
    dto.job = application.job.toString();
    dto.createdAt = application.created_at.toISOString();
    dto.updatedAt = application.updated_at.toISOString();
    dto.parsingStatus = application.parsing_status;
    dto.scoringStatus = application.scoring_status;
    dto.resumeAnalysis =application.resume_analysis
      ? ResumeScoreResponse.fromEntity(application.resume_analysis)
      : null;
    dto.resumeScore=application.resume_score;
    dto.scoreCriteriaVersion=application.scoring_criteria_version;
    return dto;
  }
}


export class GetApplicationResponse{

  @ApiProperty({
    description:"Candidate Applications"
  })
  @IsArray()
  applications:ApplicationResponse[]
  
  @ApiProperty()
  @IsNumber()
  totalCandidates:number

  static fromEntity(applications: Application[],totalCandidates:number,pageNo:number){
    const dto = new GetApplicationResponse()
    dto.applications = applications.map((a,idx)=>ApplicationResponse.fromEntity(a,pageNo*(idx+1))); 
    dto.totalCandidates=totalCandidates
    return dto;
  }
}