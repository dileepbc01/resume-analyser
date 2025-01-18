import { InjectQueue } from "@nestjs/bullmq";
import {
  Controller,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetApplicationResponse, GetApplicationsDto } from "@repo/types";
import { Queue } from "bullmq";
import { Request } from "express";
import { CONSTANTS } from "src/common/constants";
import { ResumeFileTypeValidator } from "src/common/file-validators";
import { AccessTokenGuard } from "src/common/guards/access-token.guard";
import { AppQueueEnum, FileMimeTypes, QueuePayload } from "src/queues/app-queues";
import { S3Service } from "src/s3/s3.service";

import { ApplicationService } from "./application.service";

@Controller("application")
@UseGuards(AccessTokenGuard)
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    @InjectQueue(AppQueueEnum.RESUME_PARSE)
    private readonly resumeParsingQueue: Queue<QueuePayload["resume-parse"]>,
    private readonly s3Service: S3Service
  ) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFileAndValidate(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: CONSTANTS.MAX_FILE_SIZE }),
          new ResumeFileTypeValidator({
            fileType: [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "image/jpeg",
              "text/plain",
              "application/vnd.oasis.opendocument.text",
            ],
          }),
        ],
      })
    )
    file: Express.Multer.File,
    @Req() req: Request
  ) {
    if (!Object.values(FileMimeTypes).includes(file.mimetype as any)) {
      throw new Error(`${file.mimetype} not supported`);
    }

    const file_url = await this.s3Service.uploadFile(file);
    const applicationId = await this.applicationService.createApplication({
      resume_url: file_url,
      resumeFileName: file.originalname,
      jobId: req.body.job_id,
    });
    await this.resumeParsingQueue.add("parse-resume", {
      applicationId: applicationId,
      jobId: req.body.job_id,
      resumeFileUrl: file_url,
      mimeType: file.mimetype as FileMimeTypes,
      resumeFileName: file.originalname,
    });
  }

  @Get()
  async getApplications(@Query() dto: GetApplicationsDto): Promise<GetApplicationResponse[]> {
    const applicants = await this.applicationService.getApplicationsByJobId(dto.job_id);
    return applicants.map((a) => GetApplicationResponse.fromEntity(a));
  }
}
