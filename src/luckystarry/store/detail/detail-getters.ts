import * as models from '../../models'
import * as frame from '../frame'
import { IDetailGetter } from './detail-getter'
import { IDetailState } from './detail-state'
import * as types from './types'

export interface IDetailGetters<
  TEntity extends models.IEntity,
  TState extends IDetailState<TEntity> = IDetailState<TEntity>,
  TGetter extends IDetailGetter<TEntity> = IDetailGetter<TEntity>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.IFrameGetters<TState, TRootState> {
  [types.getters.SUBJECT]: (
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ) => TEntity

  [types.getters.LOADING_STATE]: (
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ) => boolean
}

export class DetailGetters<
  TEntity extends models.IEntity,
  TState extends IDetailState<TEntity> = IDetailState<TEntity>,
  TGetter extends IDetailGetter<TEntity> = IDetailGetter<TEntity>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.FrameGetters<TState, TRootState>
  implements IDetailGetters<TEntity, TState, TGetter, TRootState> {
  public [types.getters.SUBJECT](
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ): TEntity {
    return state[types.state.SUBJECT]
  }

  public [types.getters.LOADING_STATE](
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ): boolean {
    return state[types.state.LOADING_STATE]
  }
}
