import * as models from '../../models'
import * as detail from '../detail'
import * as frame from '../frame'
import { IDetailEditableGetter } from './detail-editable-getter'
import { IDetailEditableState } from './detail-editable-state'
import * as types from './types'

export interface IDetailEditableGetters<
  TEntity extends models.IEntity,
  TState extends IDetailEditableState<TEntity> = IDetailEditableState<TEntity>,
  TGetter extends IDetailEditableGetter<TEntity> = IDetailEditableGetter<
    TEntity
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends detail.IDetailGetters<TEntity, TState, TGetter, TRootState> {
  [types.getters.ORIGINAL]: (
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ) => TEntity
}

export class DetailEditableGetters<
  TEntity extends models.IEntity,
  TState extends IDetailEditableState<TEntity> = IDetailEditableState<TEntity>,
  TGetter extends IDetailEditableGetter<TEntity> = IDetailEditableGetter<
    TEntity
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends detail.DetailGetters<TEntity, TState, TGetter, TRootState>
  implements IDetailEditableGetters<TEntity, TState, TGetter, TRootState> {
  public [types.getters.ORIGINAL](
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ): TEntity {
    return state[types.state.ORIGINAL]
  }
}
