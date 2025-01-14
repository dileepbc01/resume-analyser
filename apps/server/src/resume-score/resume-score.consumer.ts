import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Worker } from 'bullmq';

@Processor('audio')
export class AudioConsumer extends WorkerHost {
  process(job: Job, token?: string): Promise<any> {
    let progress = 0;
    for (i = 0; i < 100; i++) {
      await doSomething(job.data);
      progress += 1;
      await job.progress(progress);
    }
    return {};
  }
  worker(): Worker<any, any, string> {
    //
  }
}
