export enum LogSeverity {
  low = "low",
  medium = "medium",
  hight = "hight",
}

export class LogEntity {
  level: LogSeverity;
  message: string;
  createAt: Date;

  constructor(level: LogSeverity, message: string) {
    this.createAt = new Date();
    this.level = level;
    this.message = message;
  }

  static readonly fromJson = (log: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(log);

    const newLog = new LogEntity(level, message);
    newLog.createAt = new Date(createdAt);

    return newLog;
  };
}
