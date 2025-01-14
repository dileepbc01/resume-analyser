import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApplicationModule } from "./application/application.module";
import { AuthModule } from "./auth/auth.module";
import { JobModule } from "./job/job.module";
import { RecruiterModule } from "./recruiter/recruiter.module";
import { VideoQueueEventsListener } from "./video-queue.event";
import { VideoController } from "./video.controller";
import { VideoProcessor } from "./video.worker";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: { host: "localhost", port: 6379 },
      defaultJobOptions: {
        attempts: 3, // Max number of attempts for failed jobs
        removeOnComplete: 1000, // Keep data for the last 1000 completed jobs
        removeOnFail: 3000, // Keep data for the last 3000 failed jobs
        backoff: 2000, // Wait at least 2 seconds before attempting the job again, after failure
      },
    }),
    BullModule.registerQueue({ name: "video" }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    RecruiterModule,
    JobModule,
    AuthModule,
    ApplicationModule,
  ],
  controllers: [AppController, VideoController],
  providers: [AppService, VideoProcessor, VideoQueueEventsListener],
  exports: [],
})
export class AppModule {}
