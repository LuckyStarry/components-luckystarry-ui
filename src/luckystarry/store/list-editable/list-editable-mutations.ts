import * as list from '../list'
import * as models from '../../models'
import * as types from './types'
import { IListEditableState } from './list-editable-state'

export interface IListEditableMutations<
  T extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<T, TQuery> = IListEditableState<T, TQuery>
> extends list.IListMutations<T, TQuery, TState> {}

export class ListEditableMutations<
  T extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<T, TQuery> = IListEditableState<T, TQuery>
> extends list.ListMutations<T, TQuery, TState>
  implements IListEditableMutations<T, TQuery, TState> {}
