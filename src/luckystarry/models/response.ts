export interface IResponse<T> {
  readonly IsSuccessful: boolean
  readonly Message: string
  readonly Entity: T
  readonly Type: number
  readonly Code: string
}

export class Response<T> {
  private readonly success: boolean
  private readonly message: string
  private readonly entity: T
  private readonly type: number
  private readonly code: string

  constructor(original: {
    success: boolean
    message: string
    entity: T
    type?: number
    code?: string
  }) {
    this.success = original.success
    this.message = original.message || ''
    this.entity = original.entity
    this.type = original.type || 0
    this.code = original.code || '0000'
  }

  public get IsSuccessful(): boolean {
    return this.success
  }

  public get Message(): string {
    return this.message
  }

  public get Entity(): T {
    return this.entity
  }

  public get Type(): number {
    return this.type
  }

  public get Code(): string {
    return this.code
  }

  public static Create<U>(
    original: {
      success: boolean
      message: string
      entity: any
      type?: number
      code?: string
    },
    transfer: (obj: any) => U
  ): Response<U> {
    return new Response<U>({
      success: original.success,
      message: original.message,
      entity: transfer(original.entity),
      type: original.type,
      code: original.code
    })
  }
}
