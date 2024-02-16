import { LogEntity, LogSeverity } from "../../domain/entities/LogEntity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDataSource } from "../../domain/datasources/log.datasource";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }
  async getLog(severity: LogSeverity): Promise<LogEntity[]> {
    return this.logDataSource.getLog(severity);
  }
}
