import * as models from '../../models'
import * as frame from '../frame'
import * as dialog from '../dialog'
import * as list from '../list'
import * as types from './types'
import { IListEditableState } from './list-editable-state'
import { IListEditableGetter } from './list-editable-getter'
import { Loading, Notification } from 'element-ui'

export interface IListEditableActions<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<TEntity, TQuery> = IListEditableState<
    TEntity,
    TQuery
  >,
  TGetter extends IListEditableGetter<
    TEntity,
    TQuery,
    TState
  > = IListEditableGetter<TEntity, TQuery, TState>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends list.IListActions<TEntity, TQuery, TState, TGetter, TRootState> {
  [types.actions.CREATE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  )
}

export abstract class ListEditableActions<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<TEntity, TQuery> = IListEditableState<
    TEntity,
    TQuery
  >,
  TGetter extends IListEditableGetter<
    TEntity,
    TQuery,
    TState
  > = IListEditableGetter<TEntity, TQuery, TState>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends list.ListActions<TEntity, TQuery, TState, TGetter, TRootState>
  implements
    IListEditableActions<TEntity, TQuery, TState, TGetter, TRootState> {
  public async [types.actions.CREATE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ) {
    let loading = Loading.service({
      fullscreen: true,
      text: '正在检查权限...'
    })
    let closed = false
    try {
      let response = await frame.utils.ApiProxy<TEntity>(
        context,
        async () => await context.dispatch(types.actions.API_CRAETE)
      )
      closed = true
      loading.close()
      if (response.IsSuccessful) {
        let entity: TEntity = await context.dispatch(
          `${types.modules.EDIT_DIALOG}/${dialog.editable.types.actions.EDIT}`,
          response.Entity
        )
        if (entity) {
          await context.dispatch(list.types.actions.SEARCH)
        }
        return entity
      } else {
        if (response.Message) {
          Notification.error({
            title: '创建失败',
            message: response.Message
          })
        }
      }
    } catch (error) {
      if (!closed) {
        loading.close()
      }
      if (error) {
        context.dispatch(frame.types.actions.ON_EXCEPTION, error)
      }
    }
  }

  public abstract async [types.actions.API_CRAETE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<models.IResponse<TEntity>>

  public async [types.actions.UPDATE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    original: TEntity
  ) {
    let loading = Loading.service({
      fullscreen: true,
      text: '正在获取最新状态的数据...'
    })
    let closed = false
    try {
      let response = await frame.utils.ApiProxy<TEntity>(
        context,
        async () => await context.dispatch(types.actions.API_GET, original)
      )
      closed = true
      loading.close()
      if (response.IsSuccessful) {
        let entity: TEntity = await context.dispatch(
          `${types.modules.EDIT_DIALOG}/${dialog.editable.types.actions.EDIT}`,
          response.Entity
        )
        if (entity) {
          await context.dispatch(list.types.actions.SEARCH)
        }
      } else {
        if (response.Message) {
          Notification.error({
            title: '更新失败',
            message: response.Message
          })
        }
      }
    } catch (error) {
      if (!closed) {
        loading.close()
      }
      if (error) {
        context.dispatch(frame.types.actions.ON_EXCEPTION, error)
      }
    }
  }
}

export class DefaultListEditableActions<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<TEntity, TQuery> = IListEditableState<
    TEntity,
    TQuery
  >,
  TGetter extends IListEditableGetter<
    TEntity,
    TQuery,
    TState
  > = IListEditableGetter<TEntity, TQuery, TState>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends ListEditableActions<TEntity, TQuery, TState, TGetter, TRootState> {
  public async [types.actions.API_SEARCH](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<models.IResponse<models.ISearchResultEntity<TEntity>>> {
    return models.Response.Create<models.ISearchResultEntity<TEntity>>(
      {
        success: false,
        message: '未实现的方法',
        entity: {
          count: 0,
          list: []
        }
      },
      x => x as models.ISearchResultEntity<TEntity>
    )
  }

  public async [types.actions.API_CRAETE](
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

  public async [types.actions.API_GET](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    original: TEntity
  ): Promise<models.IResponse<TEntity>> {
    if (original) {
      return models.Response.Create<TEntity>(
        {
          success: true,
          message: '',
          entity: original
        },
        x => x as TEntity
      )
    } else {
      return models.Response.Create<TEntity>(
        {
          success: false,
          message: '未实现的方法',
          entity: {}
        },
        x => x as TEntity
      )
    }
  }
}
