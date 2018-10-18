import { Command } from './command'

export class Executer {
  public async Execute(command: Command): Promise<any> {
    await command.Execute()
    return command.Result
  }
}
