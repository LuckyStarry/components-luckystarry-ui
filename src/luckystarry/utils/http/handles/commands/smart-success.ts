import { Command } from '../command'

export class SmartSuccess extends Command {
  constructor(response: any) {
    super(response)
  }

  public async Execute(): Promise<void> {
    this.Result = this.Response.data.entity
  }
}
