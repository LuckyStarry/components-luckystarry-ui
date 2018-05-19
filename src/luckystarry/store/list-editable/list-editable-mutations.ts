import * as list from '../list'
import * as models from '../../models'
import * as types from './types'
import { IListEditableState } from './list-editable-state'

export interface IListEditableMutations<
  T extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<T, TQuery> = IListEditableState<T, TQuery>
> extends list.IListMutations<T, TQuery, TState> {
  [types.mutations.TABLE_ROW_RESET](state: TState, entity: T)
}

export class ListEditableMutations<
  T extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<T, TQuery> = IListEditableState<T, TQuery>
> extends list.ListMutations<T, TQuery, TState>
  implements IListEditableMutations<T, TQuery, TState> {
  public [types.mutations.TABLE_ROW_RESET](state: TState, entity: T) {
    let index = state[list.types.state.TABLE_LIST].findIndex(item =>
      item.EqualTo(entity)
    )
    if (index >= 0) {
      state[list.types.state.TABLE_LIST][index] = entity
    }
  }
}
