import * as list from '../list'
import { IEntity, IQuery } from '../../models'

export interface IListEditableState<
  T extends IEntity,
  TQuery extends IQuery = IQuery
> extends list.IListState<T, TQuery> {}

export class ListEditableState<
  T extends IEntity,
  TQuery extends IQuery = IQuery
> extends list.ListState<T, TQuery> implements IListEditableState<T, TQuery> {}
