import { Command } from '../command'

export class SmartFailed extends Command {
  constructor(response: any) {
    super(response)
  }

  public async Execute(): Promise<void> {
    this.Result = this.Response.data.entity
  }
}
