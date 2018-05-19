import * as frame from '../frame'
import { IDialogState } from './dialog-state'
import * as types from './types'

export interface IDialogGetter<TState extends IDialogState = IDialogState>
  extends frame.IFrameGetter {
  readonly [types.getters.DIALOG_VISIBLE]: boolean
}
