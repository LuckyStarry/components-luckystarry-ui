import * as models from '../../models'
import * as frame from '../frame'
import * as list from '../list'
import * as types from './types'
import { IListEditableGetter } from './list-editable-getter'
import { IListEditableState } from './list-editable-state'

export interface IListEditableGetters<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<TEntity, TQuery> = IListEditableState<
    TEntity,
    TQuery
  >,
  TGetter extends IListEditableGetter<TEntity, TQuery> = IListEditableGetter<
    TEntity,
    TQuery
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends list.IListGetters<TEntity, TQuery, TState, TGetter, TRootState> {}

export class ListEditableGetters<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<TEntity, TQuery> = IListEditableState<
    TEntity,
    TQuery
  >,
  TGetter extends IListEditableGetter<TEntity, TQuery> = IListEditableGetter<
    TEntity,
    TQuery
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends list.ListGetters<TEntity, TQuery, TState, TGetter, TRootState>
  implements
    IListEditableGetters<TEntity, TQuery, TState, TGetter, TRootState> {}
