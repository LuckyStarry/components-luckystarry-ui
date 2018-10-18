import { Command } from './command'
import {
  SmartSuccess,
  NoSmart,
  ErrorAuth,
  SmartFailed,
  ErrorHttpStatus401
} from './commands'
import { ResponseType } from '../../../models'

export class Factory {
  private options: { smart: boolean; silence: boolean }

  constructor(options?: { smart?: boolean; silence?: boolean }) {
    this.options = Object.assign({ smart: true, silence: false }, options)
  }

  public Create(response): Command {
    if (this.options.smart) {
      if (response.data.success) {
        return new SmartSuccess(response)
      } else {
        switch (response.data.type) {
          case ResponseType.ERROR_AUTH:
            return new ErrorAuth(response)
        }
        return new SmartFailed(response)
      }
    } else {
      return new NoSmart(response)
    }
  }

  public CreateError(response): Command {
    if (this.options.smart) {
      switch (response.status) {
        case 401:
          return new ErrorHttpStatus401(response)
      }
      return new SmartFailed(response)
    } else {
      return new NoSmart(response)
    }
  }
}
