export abstract class Command {
  constructor(response: any) {
    this.Response = response
  }

  public readonly Response: any
  public Result: any

  public abstract async Execute(): Promise<void>
}
