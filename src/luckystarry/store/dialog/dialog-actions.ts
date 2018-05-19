import * as frame from '../frame'
import { IDialogGetter } from './dialog-getter'
import { IDialogState } from './dialog-state'
import * as types from './types'

export interface IDialogActions<
  TState extends IDialogState = IDialogState,
  TGetter extends IDialogGetter<TState> = IDialogGetter<TState>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.IFrameActions<TState, TGetter, TRootState> {
  [types.actions.OPEN](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  )
  [types.actions.CLOSE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  )
  [types.actions.VISIBLE_CHANGE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    visible: boolean
  )
}

export abstract class DialogActions<
  TState extends IDialogState = IDialogState,
  TGetter extends IDialogGetter<TState> = IDialogGetter<TState>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.FrameActions<TState, TGetter, TRootState>
  implements IDialogActions<TState, TGetter, TRootState> {
  public async [types.actions.OPEN](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ) {
    context.commit(types.mutations.VISIBLE_UPDATE, true)
  }

  public async [types.actions.CLOSE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ) {
    context.commit(types.mutations.VISIBLE_UPDATE, false)
  }

  public async [types.actions.VISIBLE_CHANGE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    visible: boolean
  ) {
    if (visible !== context.getters[types.getters.DIALOG_VISIBLE]) {
      if (visible) {
        await context.dispatch(types.actions.OPEN)
      } else {
        await context.dispatch(types.actions.CLOSE)
      }
    }
  }
}
