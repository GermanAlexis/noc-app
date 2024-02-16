interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    const petition = await fetch(url);

    try {
      if (!petition.ok) {
        throw new Error("Error on Check Service");
      }
      this.successCallback();
      return true;
    } catch (error) {
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
