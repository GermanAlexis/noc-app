import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class cronService {
  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    const job = CronJob.from({
      cronTime,
      onTick,
      start: true,
      timeZone: "America/Los_Angeles",
    });
    job.start();

    return job;
  }
}
