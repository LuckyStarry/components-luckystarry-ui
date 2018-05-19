import * as frame from '../frame'
import * as types from './types'

export interface IDialogState extends frame.IFrameState {
  [types.state.DIALOG_VISIBLE]: boolean
}

export class DialogState implements IDialogState {
  private visible: boolean = false

  public set [types.state.DIALOG_VISIBLE](value: boolean) {
    this.visible = value
  }

  public get [types.state.DIALOG_VISIBLE](): boolean {
    return this.visible
  }
}
