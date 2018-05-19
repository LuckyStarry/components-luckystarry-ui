import * as models from '../../models'
import * as frame from '../frame'
import { IDetailGetter } from './detail-getter'
import { IDetailState } from './detail-state'
import * as types from './types'

export interface IDetailActions<
  TEntity extends models.IEntity,
  TState extends IDetailState<TEntity> = IDetailState<TEntity>,
  TGetter extends IDetailGetter<TEntity, TState> = IDetailGetter<
    TEntity,
    TState
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.IFrameActions<TState, TGetter, TRootState> {
  [types.actions.LOAD](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  )
  [types.actions.SUBJECT_RESET](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    entity: TEntity
  )
}

export abstract class DetailActions<
  TEntity extends models.IEntity,
  TState extends IDetailState<TEntity> = IDetailState<TEntity>,
  TGetter extends IDetailGetter<TEntity, TState> = IDetailGetter<
    TEntity,
    TState
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.FrameActions<TState, TGetter, TRootState>
  implements IDetailActions<TEntity, TState, TGetter, TRootState> {
  public async [types.actions.LOAD](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ) {
    try {
      context.commit(types.mutations.LOADING_STATE_UPDATE, true)
      let response: models.IResponse<TEntity> = await context.dispatch(
        types.actions.API_LOAD
      )
      await context.dispatch(types.actions.SUBJECT_RESET, response.Entity)
    } catch (error) {
      context.dispatch(frame.types.actions.ON_EXCEPTION, error)
    } finally {
      context.commit(types.mutations.LOADING_STATE_UPDATE, false)
    }
  }

  public abstract async [types.actions.API_LOAD](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<models.IResponse<TEntity>>

  public [types.actions.SUBJECT_RESET](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    entity: TEntity
  ) {
    context.commit(types.mutations.SUBJECT_RESET, entity)
  }
}
