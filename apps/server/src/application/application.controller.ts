import { InjectQueue } from "@nestjs/bullmq";
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Queue } from "bullmq";
import { Request } from "express";
import { CONSTANTS } from "src/common/constants";
import { ResumeFileTypeValidator } from "src/common/file-validators";
import { AccessTokenGuard } from "src/common/guards/access-token.guard";
import { AppQueueEnum, QueuePayload } from "src/queues/app-queues";

import { ApplicationService } from "./application.service";

@Controller("application")
@UseGuards(AccessTokenGuard)
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    @InjectQueue(AppQueueEnum.RESUME_PARSE)
    private readonly resumeParsingQueue: Queue<QueuePayload["resume-parse"]>
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
    const file_url = await this.applicationService.uploadResume(file);
    this.resumeParsingQueue.add(file_url, {
      job_id: req.body.job_id,
      resume_file_url: file_url,
    });
  }
}
