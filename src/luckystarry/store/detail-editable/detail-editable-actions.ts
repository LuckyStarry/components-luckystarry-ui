import * as models from '../../models'
import * as detail from '../detail'
import * as frame from '../frame'
import { IDetailEditableGetter } from './detail-editable-getter'
import { IDetailEditableState } from './detail-editable-state'
import * as types from './types'
import { Notification } from 'element-ui'
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
  ): Promise<TEntity>
  [types.actions.CORE_SAVE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<TEntity>
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
  ): Promise<TEntity> {
    try {
      let entity: TEntity = await context.dispatch(
        detail.editable.types.actions.CORE_SAVE
      )
      if (entity) {
        await context.dispatch(types.actions.SUBJECT_RESET, entity)
        return entity
      }
    } catch (error) {
      context.dispatch(frame.types.actions.ON_EXCEPTION, error)
    }
  }
  public async [types.actions.CORE_SAVE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<TEntity> {
    try {
      context.commit(types.mutations.SAVING_STATE_UPDATE, true)

      let response = await frame.utils.ApiProxy<TEntity>(
        context,
        async () => await context.dispatch(types.actions.API_SAVE)
      )
      if (response.IsSuccessful) {
        if (response.Message) {
          Notification.success({
            title: '保存成功',
            message: response.Message
          })
        }
        return response.Entity
      } else {
        if (response.Message) {
          Notification.error({
            title: '保存失败',
            message: response.Message
          })
        }
      }
    } catch (error) {
      context.dispatch(frame.types.actions.ON_EXCEPTION, error)
    } finally {
      context.commit(types.mutations.SAVING_STATE_UPDATE, false)
    }
  }

  public abstract async [types.actions.API_SAVE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<models.IResponse<TEntity>>

  public [types.actions.SUBJECT_RESET](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    entity: TEntity
  ) {
    context.commit(detail.types.mutations.SUBJECT_RESET, entity.Clone())
    context.commit(types.mutations.ORIGINAL_RESET, entity)
  }
}

export class DefaultDetailEditableActions<
  TEntity extends models.IEntity,
  TState extends IDetailEditableState<TEntity> = IDetailEditableState<TEntity>,
  TGetter extends IDetailEditableGetter<
    TEntity,
    TState
  > = IDetailEditableGetter<TEntity, TState>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends DetailEditableActions<TEntity, TState, TGetter, TRootState> {
  public async [types.actions.API_SAVE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<models.IResponse<TEntity>> {
    return models.Response.Create<TEntity>(
      {
        success: false,
        message: '未实现的方法',
        entity: {}
      },
      x => x as TEntity
    )
  }
  public async [types.actions.API_LOAD](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<models.IResponse<TEntity>> {
    return models.Response.Create<TEntity>(
      {
        success: false,
        message: '未实现的方法',
        entity: {}
      },
      x => x as TEntity
    )
  }
  constructor() {
    super()
  }
}
