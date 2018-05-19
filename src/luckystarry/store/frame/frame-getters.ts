import { GetterTree } from 'vuex'
import { IFrameState } from './frame-state'

export interface IFrameGetters<
  TState extends IFrameState,
  TRootState extends IFrameState = IFrameState
> extends GetterTree<TState, TRootState> {}

export class FrameGetters<
  TState extends IFrameState,
  TRootState extends IFrameState = IFrameState
> implements IFrameGetters<TState, TRootState> {
  [key: string]: (
    state: TState,
    getters: any,
    rootState: TRootState,
    rootGetters: any
  ) => any
}
