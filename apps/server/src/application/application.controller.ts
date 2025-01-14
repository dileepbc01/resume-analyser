import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CONSTANTS } from "src/common/constants";
import { ResumeFileTypeValidator } from "src/common/file-validators";

import { ApplicationService } from "./application.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";

@Controller("application")
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  @Get()
  findAll() {
    return this.applicationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.applicationService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.applicationService.remove(+id);
  }
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
    )
    files: Express.Multer.File[]
  ) {
    const resolvedPromises = await Promise.allSettled(
      await files.map(async (file) => {
        return this.applicationService.uploadResume(file);
      })
    );
    console.log("resolvedPromises", resolvedPromises);
    return resolvedPromises;
  }
}
