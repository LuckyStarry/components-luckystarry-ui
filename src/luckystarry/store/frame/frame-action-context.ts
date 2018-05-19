import { ActionContext } from 'vuex'
import { IFrameGetter } from './frame-getter'
import { IFrameState } from './frame-state'

export interface IFrameActionContext<
  TState extends IFrameState,
  TGetter extends IFrameGetter = IFrameGetter,
  TRootState extends IFrameState = IFrameState
> extends ActionContext<TState, TRootState> {
  readonly getters: TGetter
}
