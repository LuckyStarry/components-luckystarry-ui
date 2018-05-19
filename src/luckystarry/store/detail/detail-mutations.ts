import * as models from '../../models'
import * as frame from '../frame'
import { IDetailState } from './detail-state'
import * as types from './types'

export interface IDetailMutations<
  TEntity extends models.IEntity,
  TState extends IDetailState<TEntity> = IDetailState<TEntity>
> extends frame.IFrameMutations<TState> {
  [types.mutations.LOADING_STATE_UPDATE](state: TState, status: boolean)
  [types.mutations.SUBJECT_RESET](state: TState, entity: TEntity)
}

export class DetailMutations<
  TEntity extends models.IEntity,
  TState extends IDetailState<TEntity> = IDetailState<TEntity>
> extends frame.FrameMutations<TState>
  implements IDetailMutations<TEntity, TState> {
  public [types.mutations.LOADING_STATE_UPDATE](
    state: TState,
    status: boolean
  ) {
    state[types.state.LOADING_STATE] = status
  }

  public [types.mutations.SUBJECT_RESET](state: TState, entity: TEntity) {
    state[types.state.SUBJECT] = entity
  }
}
