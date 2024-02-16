export enum LogSeverity {
  low = "low",
  medium = "medium",
  hight = "hight",
}

export class LogEntity {
  level: LogSeverity;
  message: string;
  createAt: Date;

  constructor(level: LogSeverity, message: string, createAt: Date) {
    this.createAt = createAt;
    this.level = level;
    this.message = message;
  }
}
