import { ExpressAdapter } from "@bull-board/express";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApplicationModule } from "./application/application.module";
import { AuthModule } from "./auth/auth.module";
import { JobModule } from "./job/job.module";
import { RecruiterModule } from "./recruiter/recruiter.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: { url: process.env.REDIS_URL },
      defaultJobOptions: {
        attempts: 3, // Max number of attempts for failed jobs
        removeOnComplete: 1000, // Keep data for the last 1000 completed jobs
        removeOnFail: 3000, // Keep data for the last 3000 failed jobs
        backoff: 2000, // Wait at least 2 seconds before attempting the job again, after failure
      },
    }),
    BullBoardModule.forRoot({
      route: "/queues",
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    RecruiterModule,
    JobModule,
    AuthModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
