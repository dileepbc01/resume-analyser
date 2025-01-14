import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Application, ApplicationSchema } from "schema/application.schema";
import { S3Service } from "src/s3/s3.service";

import { ApplicationController } from "./application.controller";
import { ApplicationService } from "./application.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }])],

  controllers: [ApplicationController],
  providers: [ApplicationService, S3Service],
})
export class ApplicationModule {}
