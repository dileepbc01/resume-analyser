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
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { CONSTANTS } from "src/common/constants";
import { ResumeFileTypeValidator } from "src/common/file-validators";
import { AccessTokenGuard } from "src/common/guards/access-token.guard";

import { ApplicationService } from "./application.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";

@Controller("application")
@UseGuards(AccessTokenGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

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
    file: Express.Multer.File
  ) {
    console.log("file", file);
    return await this.applicationService.uploadResume(file);
  }
}
