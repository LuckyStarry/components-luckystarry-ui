import * as frame from '../frame'
import { IDialogState } from './dialog-state'
import * as types from './types'

export interface IDialogMutations<TState extends IDialogState = IDialogState>
  extends frame.IFrameMutations<TState> {
  [types.mutations.VISIBLE_UPDATE](state: TState, visible: boolean)
}

export class DialogMutations<TState extends IDialogState = IDialogState>
  extends frame.FrameMutations<TState>
  implements IDialogMutations<TState> {
  public [types.mutations.VISIBLE_UPDATE](state: TState, visible: boolean) {
    state[types.state.DIALOG_VISIBLE] = visible
  }
}
