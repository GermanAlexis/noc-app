import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.pluging";

export interface MailerOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  fileName: string;
  path: string;
}

export class EmailService {
  private transport = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: { user: envs.MAILER_ACCOUNT, pass: envs.MAILER_SECRET_KEY },
  });

  async sendEmail(options: MailerOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sentInformation = await this.transport.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      console.log("sentInformation: ", sentInformation);
      return true;
    } catch (error) {
      console.log("error: ", error);
      return false;
    }
  }

  async sendEmailWithFileLogs(options: MailerOptions) {
    const { to, subject, htmlBody } = options;

    const attachments: Attachment[] = [
      { fileName: "log-low", path: "./logs/logs-low.log" },
      { fileName: "log-medium", path: "./logs/logs-medium.log" },
      { fileName: "log-high", path: "./logs/logs-high.log" },
    ];

    this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
