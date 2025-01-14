import { Injectable } from "@nestjs/common";
import { S3Service } from "src/s3/s3.service";

import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";

@Injectable()
export class ApplicationService {
  constructor(private readonly s3Service: S3Service) {}

  create(createApplicationDto: CreateApplicationDto) {
    return "This action adds a new application";
  }

  findAll() {
    return `This action returns all application`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }

  async uploadResume(file: Express.Multer.File) {
    const uploadUrl = await this.s3Service.uploadFile(file);
    return uploadUrl;
  }
}
