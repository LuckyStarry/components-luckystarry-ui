import * as models from '../../models'
import * as frame from '../frame'
import { IListGetter } from './list-getter'
import { IListState } from './list-state'
import * as types from './types'
import { Notification, Loading } from 'element-ui'

export interface IListActions<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>,
  TGetter extends IListGetter<TEntity, TQuery, TState> = IListGetter<
    TEntity,
    TQuery,
    TState
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.IFrameActions<TState, TGetter, TRootState> {
  [types.actions.SEARCH](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  )

  [types.actions.SEARCH_FIRST_PAGE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  )

  [types.actions.RESPONSE_ENTITY_REPLACE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    response: models.IResponse<TEntity>
  )
}

export abstract class ListActions<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>,
  TGetter extends IListGetter<TEntity, TQuery, TState> = IListGetter<
    TEntity,
    TQuery,
    TState
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.FrameActions<TState, TGetter, TRootState>
  implements IListActions<TEntity, TQuery, TState, TGetter, TRootState> {
  public async [types.actions.SEARCH](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ) {
    try {
      context.commit(types.mutations.SEARCHING_STATE_UPDATE, true)

      let response = await frame.utils.ApiProxy<
        models.ISearchResultEntity<TEntity>
      >(context, async () => await context.dispatch(types.actions.API_SEARCH))

      if (response) {
        if (response.IsSuccessful) {
          Notification.success({
            title: '系统通知',
            message:
              response.Message ||
              `查询成功，符合条件的数据共计 ${response.Entity.Count} 条。`
          })
          if (response.Entity) {
            context.commit(types.mutations.TABLE_LIST_RESET, response.Entity)
          }
        } else {
          Notification.error({
            title: '系统通知',
            message: response.Message || '查询失败'
          })
          context.commit(types.mutations.TABLE_LIST_RESET, [])
        }
        return response.Entity
      }
    } catch (error) {
      context.dispatch(frame.types.actions.ON_EXCEPTION, error)
    } finally {
      context.commit(types.mutations.SEARCHING_STATE_UPDATE, false)
    }
  }

  public async [types.actions.SEARCH_FIRST_PAGE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ) {
    context.commit(types.mutations.QUERY_MODEL_REFRESH, { PageIndex: 1 })
    await context.dispatch(types.actions.SEARCH)
  }

  public async [types.actions.RESPONSE_ENTITY_REPLACE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    response: models.IResponse<TEntity>
  ) {
    if (response) {
      if (response.IsSuccessful) {
        Notification.success({
          title: '系统通知',
          message: response.Message || '操作成功'
        })
        if (response.Entity) {
          context.commit(types.mutations.TABLE_ROW_RESET, response.Entity)
        }
      } else {
        Notification.error({
          title: '系统通知',
          message: response.Message || '操作失败'
        })
      }
      return response.Entity
    }
  }

  public async [types.actions.UPDATE_PROXY](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    payload: {
      original: TEntity
      process: (model: TEntity) => Promise<TEntity>
    }
  ) {
    let loading = Loading.service({
      fullscreen: true,
      text: '正在获取最新状态的数据...'
    })
    let closed = false
    try {
      let response = await frame.utils.ApiProxy<TEntity>(
        context,
        async () =>
          await context.dispatch(types.actions.API_GET, payload.original)
      )
      closed = true
      loading.close()
      if (response.IsSuccessful) {
        let entity: TEntity = await payload.process(response.Entity)
        if (entity) {
          await context.dispatch(types.actions.SEARCH)
        }
        return entity
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

  public abstract async [types.actions.API_SEARCH](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<models.IResponse<models.ISearchResultEntity<TEntity>>>

  public abstract async [types.actions.API_GET](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    original: TEntity
  ): Promise<models.IResponse<TEntity>>
}

export class DefaultListActions<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>,
  TGetter extends IListGetter<TEntity, TQuery, TState> = IListGetter<
    TEntity,
    TQuery,
    TState
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends ListActions<TEntity, TQuery, TState, TGetter, TRootState> {
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
