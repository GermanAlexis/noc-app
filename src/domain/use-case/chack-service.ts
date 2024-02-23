import { LogEntity, LogSeverity } from "../entities/LogEntity";
import { LogRepository } from "../repository/log.repository";
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    const petition = await fetch(url);

    try {
      if (!petition.ok) {
        throw new Error("Error on Check Service");
      }
      const log = new LogEntity(LogSeverity.low, `${url} is working`);
      this.logRepository.saveLog(log);
      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${error}`;

      const log = new LogEntity(LogSeverity.hight, `${errorMessage}`);
      this.logRepository.saveLog(log);
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
