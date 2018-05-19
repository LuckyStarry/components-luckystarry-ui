export interface IResponse<T> {
  readonly IsSuccessful: boolean
  readonly Message: string
  readonly Entity: T
}

export class Response<T> {
  private readonly _isSuccessful: boolean
  private readonly _message: string
  private readonly _entity: T

  constructor(original: { IsSuccessful: boolean; Message: string; Entity: T }) {
    this._isSuccessful = original.IsSuccessful
    this._message = original.Message || ''
    this._entity = original.Entity
  }

  public get IsSuccessful(): boolean {
    return this._isSuccessful
  }

  public get Message(): string {
    return this._message
  }

  public get Entity(): T {
    return this._entity
  }

  public static Create<U>(
    original: { IsSuccessful: boolean; Message: string; Entity: any },
    transfer: (obj: any) => U
  ): Response<U> {
    return new Response<U>({
      IsSuccessful: original.IsSuccessful,
      Message: original.Message,
      Entity: transfer(original.Entity)
    })
  }
}
