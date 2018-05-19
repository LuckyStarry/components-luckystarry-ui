import uuid from 'uuid'
import { ICloneable } from './cloneable'

export interface IEntity extends ICloneable<IEntity> {
  EqualTo(obj: IEntity): boolean
}

export abstract class Entity<T> implements IEntity {
  public ID: T
  public CreateTime: number
  public CreateUser: number
  public LastUpdateTime: number
  public LastUpdateUser: number
  public LogicalDelete: boolean
  private _uuid = uuid.v4()

  constructor(original?: any) {
    Object.assign(
      this,
      {
        ID: 0,
        CreateTime: 0,
        CreateUser: 0,
        LastUpdateTime: 0,
        LastUpdateUser: 0,
        LogicalDelete: false
      },
      original
    )
  }

  public EqualTo(obj: Entity<T>): boolean {
    return obj && this.ID === obj.ID
  }

  public Clone(): IEntity {
    return Object.assign({}, this)
  }

  public get uuid() {
    return this._uuid
  }
}
