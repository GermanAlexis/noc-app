import { CheckService } from "../domain/use-case/chack-service";
import { FileSystemDataSource } from "../infratucture/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infratucture/repositories/log.repository.impl";
import { cronService } from "../presentation/cron/cron.service";
import { Server } from "../presentation/server";

const fileSystemLogDataSource = new LogRepositoryImpl(
  new FileSystemDataSource()
);

(async () => {
  main();
})();

function main() {
  Server.start();

  cronService.createJob("*/5 * * * * *", () => {
    const url = "https://www.google.com";

    new CheckService(
      fileSystemLogDataSource,
      () => console.log(`${url} is ok`),
      (error) => console.log(error)
    ).execute(url);
  });
}
