import * as models from '../../models'
import * as detail from '../detail'
import { IDetailEditableState } from './detail-editable-state'
import * as types from './types'

export interface IDetailEditableMutations<
  TEntity extends models.IEntity,
  TState extends IDetailEditableState<TEntity> = IDetailEditableState<TEntity>
> extends detail.IDetailMutations<TEntity, TState> {
  [types.mutations.SAVING_STATE_UPDATE](state: TState, status: boolean)
  [types.mutations.ORIGINAL_RESET](state: TState, entity: TEntity)
}

export class DetailEditableMutations<
  TEntity extends models.IEntity,
  TState extends IDetailEditableState<TEntity> = IDetailEditableState<TEntity>
> extends detail.DetailMutations<TEntity, TState>
  implements IDetailEditableMutations<TEntity, TState> {
  public [types.mutations.SAVING_STATE_UPDATE](state: TState, status: boolean) {
    state[types.state.SAVING_STATE] = status
  }

  public [types.mutations.ORIGINAL_RESET](state: TState, entity: TEntity) {
    state[types.state.ORIGINAL] = entity
  }
}
