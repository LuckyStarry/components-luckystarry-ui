import * as frame from '../frame'
import { IDialogGetter } from './dialog-getter'
import { IDialogState } from './dialog-state'
import * as types from './types'

export interface IDialogGetters<
  TState extends IDialogState = IDialogState,
  TGetter extends IDialogGetter = IDialogGetter,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.IFrameGetters<TState, TRootState> {
  [types.getters.DIALOG_VISIBLE]: (
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ) => boolean
}

export class DialogGetters<
  TState extends IDialogState = IDialogState,
  TGetter extends IDialogGetter = IDialogGetter,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.FrameGetters<TState, TRootState>
  implements IDialogGetters<TState, TGetter, TRootState> {
  public [types.getters.DIALOG_VISIBLE](
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ): boolean {
    return state[types.state.DIALOG_VISIBLE]
  }
}
