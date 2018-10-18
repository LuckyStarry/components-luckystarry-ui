import { Command } from '../command'
import { ResponseCode } from '../../../../models'
import { service } from '../../service'

export class ErrorAuth extends Command {
  constructor(response: any) {
    super(response)
  }

  public async Execute(): Promise<void> {
    switch (this.Response.data.code) {
      case ResponseCode.E9001:
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
        break
    }
    this.Result = this.Response
  }
}
