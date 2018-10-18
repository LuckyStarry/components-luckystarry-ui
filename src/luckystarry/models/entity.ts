import uuid from 'uuid'
import { ICloneable } from './cloneable'

export interface IEntity extends ICloneable<IEntity> {
  EqualTo(obj: IEntity): boolean
}

export abstract class Entity<T> implements IEntity {
  private id: T
  private createTime: number
  private createUser: string
  private createUserName: string
  private lastUpdateTime: number
  private lastUpdateUser: string
  private lastUpdateUserName: string
  private logicalDelete: number
  private _uuid = uuid.v4()

  constructor(original?: any) {
    Object.assign(this, original)
  }

  public set ID(value: T) {
    this.id = value
  }

  public get ID(): T {
    return this.id
  }

  public set CreateTime(value: number) {
    this.createTime = value
  }

  public get CreateTime(): number {
    return this.createTime
  }

  public set CreateUser(value: string) {
    this.createUser = value
  }

  public get CreateUser(): string {
    return this.createUser
  }

  public set CreateUserName(value: string) {
    this.createUserName = value
  }

  public get CreateUserName(): string {
    return this.createUserName
  }

  public set LastUpdateTime(value: number) {
    this.lastUpdateTime = value
  }

  public get LastUpdateTime(): number {
    return this.lastUpdateTime
  }

  public set LastUpdateUser(value: string) {
    this.lastUpdateUser = value
  }

  public get LastUpdateUser(): string {
    return this.lastUpdateUser
  }

  public set LastUpdateUserName(value: string) {
    this.lastUpdateUserName = value
  }

  public get LastUpdateUserName(): string {
    return this.lastUpdateUserName
  }

  public set LogicalDelete(value: number) {
    this.logicalDelete = value
  }

  public get LogicalDelete(): number {
    return this.logicalDelete
  }

  public EqualTo(obj: Entity<T>): boolean {
    return obj && this.ID === obj.ID
  }

  public Clone(): IEntity {
    return Object.assign({}, this) as IEntity
  }

  public get uuid() {
    return this._uuid
  }

  public get CreateTimeHuman(): string {
    return new Date(this.CreateTime).toLocaleString()
  }

  public get LastUpdateTimeHuman(): string {
    return new Date(this.LastUpdateTime).toLocaleString()
  }
}
