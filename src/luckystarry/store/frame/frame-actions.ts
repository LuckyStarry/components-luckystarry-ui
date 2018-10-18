import { Notification } from 'element-ui'
import { ActionContext, ActionTree } from 'vuex'
import { IFrameActionContext } from './frame-action-context'
import { IFrameGetter } from './frame-getter'
import { IFrameState } from './frame-state'
import * as types from './types'
import * as models from '../../models'
import { utils } from '../..'

export interface IFrameActions<
  TState extends IFrameState,
  TGetter extends IFrameGetter = IFrameGetter,
  TRootState extends IFrameState = IFrameState
> extends ActionTree<TState, TRootState> {}

export class FrameActions<
  TState extends IFrameState,
  TGetter extends IFrameGetter = IFrameGetter,
  TRootState extends IFrameState = IFrameState
> implements IFrameActions<TState, TGetter, TRootState> {
  [key: string]: (
    context: ActionContext<TState, TRootState>,
    payload: any
  ) => any
}
