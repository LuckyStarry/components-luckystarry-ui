import { Command } from '../command'
import { ResponseCode } from '../../../../models'
import { service } from '../../service'

export class ErrorHttpStatus401 extends Command {
  constructor(response: any) {
    super(response)
  }

  public async Execute(): Promise<void> {
    let response = await service(
      'oauth2',
      '/oauth/authorize',
      {
        provider: 'github',
        refer: window.location.href
      },
      null,
      { smart: false }
    )
    if (response.entity.url) {
      window.location.replace(response.entity.url)
    }
    this.Result = this.Response
  }
}
