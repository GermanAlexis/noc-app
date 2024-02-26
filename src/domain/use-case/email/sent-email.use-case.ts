import { LogEntity, LogSeverity } from "../../entities/LogEntity";
import { LogRepository } from "../../repository/log.repository";
import {
  EmailService,
  MailerOptions,
} from "../../../presentation/email/email.service";

interface SentEmailUseCase {
  execute(containAttachment: boolean, options: MailerOptions): Promise<boolean>;
}

export class SentEmailService implements SentEmailUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly emailService: EmailService
  ) {}

  async execute(
    containAttachment: boolean,
    options: MailerOptions
  ): Promise<boolean> {
    try {
      if (!containAttachment) {
        await this.emailService.sendEmail(options);
      }
      if (containAttachment) {
        await this.emailService.sendEmailWithFileLogs(options);
      }
      const log = new LogEntity({
        level: LogSeverity.low,
        message: "Emails sent",
        origin: "sent-email.use-case.ts",
      });
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverity.hight,
        message: `Emails not sent - ${error}`,
        origin: "sent-email.use-case.ts",
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
