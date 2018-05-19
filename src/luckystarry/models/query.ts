export interface IQuery {
  PageIndex: number
  PageSize: number
}

export class Query implements IQuery {
  private index: number
  private size: number

  constructor() {
    this.index = 1
    this.size = 10
  }

  public set PageIndex(value: number) {
    this.index = value
  }

  public get PageIndex(): number {
    return this.index
  }

  public set PageSize(value: number) {
    this.size = value
  }

  public get PageSize(): number {
    return this.size
  }
}
