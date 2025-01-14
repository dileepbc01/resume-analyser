// s3.service.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { CONSTANTS } from "src/common/constants";

@Injectable()
export class S3Service {
  private s3: S3;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
      region: this.configService.get("AWS_REGION"),
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string = "uploads"): Promise<string> {
    const key = `${folder}/${Date.now()}-${file.originalname}`;
    console.log(file);
    const params = {
      Bucket: CONSTANTS.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };
    console.log("s3 params", params);

    const upload = await this.s3.upload(params).promise();
    return upload.Location;
  }
}
