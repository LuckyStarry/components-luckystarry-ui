import { IEntity } from './entity'

export interface ISearchResultEntity<T extends IEntity> {
  readonly Count: number
  readonly List: Array<T>
}

export class SearchResultEntity<T extends IEntity>
  implements ISearchResultEntity<T> {
  private _count: number
  private _list: Array<T>

  constructor(original: { Count: number; List: Array<T> }) {
    this._count = original.Count
    this._list = original.List || []
  }

  public get Count(): number {
    return this._count
  }

  public get List(): Array<T> {
    return this._list
  }

  public static Create<U extends IEntity>(
    original: { Count: number; List: Array<U> },
    transfer: (obj: any) => U
  ): SearchResultEntity<U> {
    return new SearchResultEntity<U>({
      Count: (original && original.Count) || 0,
      List: ((original && original.List) || []).map(transfer)
    })
  }
}
