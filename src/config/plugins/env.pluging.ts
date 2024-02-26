import "dotenv/config";
import * as env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
  MAILER_ACCOUNT: env.get("MAILER_ACCOUNT").required().asEmailString(),
};
