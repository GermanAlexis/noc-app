import { CheckService } from "../domain/use-case/chack-service";
import { cronService } from "../presentation/cron/cron.service";
import { Server } from "../presentation/server";

(async () => {
  main();
})();

function main() {
  Server.start();

  cronService.createJob("*/5 * * * * *", () => {
    const url = "https://www.google.com";
    new CheckService().execute(url);
  });
}
