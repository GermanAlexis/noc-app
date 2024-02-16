import { LogEntity, LogSeverity } from "../entities/LogEntity";

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLog(severity: LogSeverity): Promise<LogEntity[]>;
}
