import * as models from '../../models'
import * as detail from '../detail'
import * as frame from '../frame'
import { IDetailEditableGetter } from './detail-editable-getter'
import { IDetailEditableState } from './detail-editable-state'
import * as types from './types'
console.log(detail)
export interface IDetailEditableActions<
  TEntity extends models.IEntity,
  TState extends IDetailEditableState<TEntity> = IDetailEditableState<TEntity>,
  TGetter extends IDetailEditableGetter<
    TEntity,
    TState
  > = IDetailEditableGetter<TEntity, TState>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends detail.IDetailActions<TEntity, TState, TGetter, TRootState> {
  [types.actions.SAVE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<models.IResponse<TEntity>>
}

export abstract class DetailEditableActions<
  TEntity extends models.IEntity,
  TState extends IDetailEditableState<TEntity> = IDetailEditableState<TEntity>,
  TGetter extends IDetailEditableGetter<
    TEntity,
    TState
  > = IDetailEditableGetter<TEntity, TState>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends detail.DetailActions<TEntity, TState, TGetter, TRootState>
  implements IDetailEditableActions<TEntity, TState, TGetter, TRootState> {
  public async [types.actions.SAVE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<models.IResponse<TEntity>> {
    try {
      context.commit(types.mutations.SAVING_STATE_UPDATE, true)
      return await context.dispatch(types.actions.API_SAVE)
    } catch (error) {
      context.dispatch(frame.types.actions.ON_EXCEPTION, error)
    } finally {
      context.commit(types.mutations.SAVING_STATE_UPDATE, false)
    }
  }

  public abstract async [types.actions.API_SAVE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<models.IResponse<TEntity>>

  public [detail.types.actions.SUBJECT_RESET](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    entity: TEntity
  ) {
    context.commit(detail.types.mutations.SUBJECT_RESET, entity.Clone())
    context.commit(types.mutations.ORIGINAL_RESET, entity)
  }
}
