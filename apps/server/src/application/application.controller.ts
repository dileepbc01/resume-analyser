import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CONSTANTS } from 'src/common/constants';
import { ResumeFileTypeValidator } from 'src/common/file-validators';

@Controller('application')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(+id);
  }
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', CONSTANTS.MAX_FILE_UPLOADS, {
      dest: '../../uploads',
    }),
  )
  uploadFileAndValidate(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: CONSTANTS.MAX_FILE_SIZE }),
          new ResumeFileTypeValidator({
            fileType: [
              'application/pdf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'image/jpeg',
              'text/plain',
              'application/vnd.oasis.opendocument.text',
            ],
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }
}
