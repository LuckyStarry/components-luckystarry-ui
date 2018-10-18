import * as frame from '../frame'
import * as types from './types'

export interface IDialogState extends frame.IFrameState {
  [types.state.DIALOG_VISIBLE]: boolean
}

export class DialogState implements IDialogState {
  public [types.state.DIALOG_VISIBLE]: boolean = false
}
