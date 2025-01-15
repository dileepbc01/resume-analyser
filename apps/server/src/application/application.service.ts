import { Injectable } from "@nestjs/common";
import { S3Service } from "src/s3/s3.service";

@Injectable()
export class ApplicationService {
  constructor(private readonly s3Service: S3Service) {}
  async uploadResume(file: Express.Multer.File) {
    const uploadUrl = await this.s3Service.uploadFile(file);
    return uploadUrl;
  }
}
