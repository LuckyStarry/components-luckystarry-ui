import { Notification } from 'element-ui'
import { ActionContext, ActionTree } from 'vuex'
import { IFrameActionContext } from './frame-action-context'
import { IFrameGetter } from './frame-getter'
import { IFrameState } from './frame-state'
import * as types from './types'

export interface IFrameActions<
  TState extends IFrameState,
  TGetter extends IFrameGetter = IFrameGetter,
  TRootState extends IFrameState = IFrameState
> extends ActionTree<TState, TRootState> {
  [types.actions.ON_EXCEPTION](
    context: IFrameActionContext<TState, TGetter, TRootState>,
    payload: any
  ): Promise<any>
}

export class FrameActions<
  TState extends IFrameState,
  TGetter extends IFrameGetter = IFrameGetter,
  TRootState extends IFrameState = IFrameState
> implements IFrameActions<TState, TGetter, TRootState> {
  [key: string]: (
    context: ActionContext<TState, TRootState>,
    payload: any
  ) => any

  async [types.actions.ON_EXCEPTION](
    context: IFrameActionContext<TState, TGetter, TRootState>,
    payload: any
  ): Promise<any> {
    if (payload) {
      Notification.error({
        title: '系统通知',
        message: '发生了未处理的异常，请联系管理员协助处理'
      })
      console.error(payload)
    }
    return await payload
  }
}
