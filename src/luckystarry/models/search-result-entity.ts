import { IEntity } from './entity'

export interface ISearchResultEntity<T extends IEntity> {
  readonly Count: number
  readonly List: Array<T>
}

export class SearchResultEntity<T extends IEntity>
  implements ISearchResultEntity<T> {
  private count: number
  private list: Array<T>

  constructor(original: { count: number; list: Array<T> }) {
    this.count = original.count
    this.list = original.list || []
  }

  public get Count(): number {
    return this.count
  }

  public get List(): Array<T> {
    return this.list
  }

  public static Create<U extends IEntity>(
    original: { count: number; list: Array<U> },
    transfer: (obj: any) => U
  ): SearchResultEntity<U> {
    return new SearchResultEntity<U>({
      count: (original && original.count) || 0,
      list: ((original && original.list) || []).map(transfer)
    })
  }
}
