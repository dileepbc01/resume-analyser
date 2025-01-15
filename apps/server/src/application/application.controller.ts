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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CONSTANTS } from "src/common/constants";
import { ResumeFileTypeValidator } from "src/common/file-validators";

import { ApplicationService } from "./application.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";
import { AccessTokenGuard } from "src/common/guards/access-token.guard";
import { Request } from "express";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Controller("application")
@UseGuards(AccessTokenGuard)

export class ApplicationController {
  private uploadProgressMap = new Map<string, number>();

  constructor(private readonly applicationService: ApplicationService,
    private eventEmitter: EventEmitter2
  ) {}

  @Post("upload")
  @UseInterceptors(FilesInterceptor("files", CONSTANTS.MAX_FILE_UPLOADS))
  async uploadFileAndValidate(
    @UploadedFiles(
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
    )files: Express.Multer.File[],
    @Req() req: Request
  ) {
    const uploadId = req.headers['upload-id'] as string;

    req.on('data', (chunk: Buffer) => {
    console.log("progress",req.socket.bytesRead);

      const contentLength = parseInt(req.headers['content-length'] as any, 10);
      const uploaded = req.socket.bytesRead;
      const progress = Math.round((uploaded / contentLength) * 100);
      
      this.uploadProgressMap.set(uploadId, progress);
      
      // Emit progress event
      this.eventEmitter.emit('upload.progress', {
        uploadId,
        progress,
      });
    });

    const resolvedPromises = await Promise.allSettled(
      await files.map(async (file) => {
        return this.applicationService.uploadResume(file);
      })
    );
    // console.log("resolvedPromises", resolvedPromises);
    return resolvedPromises;
  }
}
