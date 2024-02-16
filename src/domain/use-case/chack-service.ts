interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
  async execute(url: string): Promise<boolean> {
    const petition = await fetch(url);

    try {
      if (!petition.ok) {
        throw new Error("Error on Check Service");
      }
      console.log("petition is ok");
      return true;
    } catch (error) {
      console.log("error: ", error);
      return false;
    }
  }
}
