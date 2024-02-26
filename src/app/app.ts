import { CheckService } from "../domain/use-case/chack-service";
import { SentEmailService } from "../domain/use-case/email/sent-email.use-case";

import { FileSystemDataSource } from "../infratucture/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infratucture/repositories/log.repository.impl";
import { cronService } from "../presentation/cron/cron.service";
import { EmailService } from "../presentation/email/email.service";
import { Server } from "../presentation/server";

const fileSystemLogDataSource = new LogRepositoryImpl(
  new FileSystemDataSource()
);
const emailService = new EmailService();

(async () => {
  main();
})();

function main() {
  Server.start();

  new SentEmailService(fileSystemLogDataSource, emailService).execute(true, {
    to: "gaaa.enginner@yopmail.com",
    subject: "test node mailer",
    htmlBody: `
    <h3>Ey bro NodeMailer</h3>
    <p>Genial lo que estas haciendo ||| Let's GOOOO!!</p>
    `,
  });

  // cronService.createJob("*/5 * * * * *", () => {
  //   const url = "https://www.google.com";

  //   new CheckService(
  //     fileSystemLogDataSource,
  //     () => console.log(`${url} is ok`),
  //     (error) => console.log(error)
  //   ).execute(url);
  // });
}
