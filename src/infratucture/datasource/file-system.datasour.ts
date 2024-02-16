import fs from "fs";

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverity } from "../../domain/entities/LogEntity";

export class FileSystemDataSource implements LogDataSource {
  private readonly path: string = "log/";
  private readonly lowPath: string = "log/logs-low.log";
  private readonly mediumPath: string = "log/logs-medium.log";
  private readonly highPath: string = "log/-logs-high.log";

  constructor() {
    this.createFiles();
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.path, logAsJson);

    if (newLog.level === LogSeverity.low) return;
    if (newLog.level === LogSeverity.medium) {
      fs.appendFileSync(this.mediumPath, logAsJson);
    } else {
      fs.appendFileSync(this.highPath, logAsJson);
    }
  }
  getLog(severity: LogSeverity): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }

  private createFiles = () => {
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }

    [this.lowPath, this.mediumPath, this.highPath].forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "");
    });
  };
}
