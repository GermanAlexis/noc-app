export enum LogSeverity {
  low = "low",
  medium = "medium",
  hight = "hight",
}

export interface LogEntityOptions {
  level: LogSeverity;
  message: string;
  createdAt?: Date;
  origin: string;
}
export class LogEntity {
  level: LogSeverity;
  message: string;
  createdAt: Date;
  origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, createdAt = new Date(), origin } = options;

    this.createdAt = createdAt;
    this.level = level;
    this.message = message;
    this.origin = origin;
  }

  static readonly fromJson = (log: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(log);

    const newLog = new LogEntity({ level, message, createdAt, origin });
    newLog.createdAt = new Date(createdAt);

    return newLog;
  };
}
