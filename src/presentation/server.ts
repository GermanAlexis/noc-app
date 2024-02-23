import { envs } from "../config/plugins/env.pluging";

export class Server {
  public static start() {
    console.log(`Server started in port ${envs.PORT}`);
  }
}
