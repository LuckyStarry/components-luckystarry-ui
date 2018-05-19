import { Entity } from './entity'
import { ICloneable } from './cloneable'

export class LoginUser implements ICloneable<LoginUser> {
  constructor(original?) {
    Object.assign(this, original)
  }

  public UID: string
  public UserName: string
  public Gender: number
  public Roles: Array<string>
  public Token: string
  public LoginTime: number

  public Clone(): LoginUser {
    return new LoginUser(this)
  }

  public get isMale(): boolean {
    return this.Gender === 1
  }

  public get isFemale(): boolean {
    return this.Gender === 0
  }
}
