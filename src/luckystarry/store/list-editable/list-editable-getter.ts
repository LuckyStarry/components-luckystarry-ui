import * as models from '../../models'
import * as frame from '../frame'
import * as list from '../list'
import * as types from './types'
import { IListEditableState } from './list-editable-state'

export interface IListEditableGetter<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<TEntity, TQuery> = IListEditableState<
    TEntity,
    TQuery
  >
> extends list.IListGetter<TEntity, TQuery, TState> {}
