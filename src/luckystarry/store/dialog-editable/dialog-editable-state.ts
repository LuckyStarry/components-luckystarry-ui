import * as models from '../../models'
import * as dialog from '../dialog'
import * as types from './types'

export interface IDialogEditableState<TEntity extends models.IEntity>
  extends dialog.IDialogState {
  [types.state.EDIT_PROMISE_RESOLVE]: (
    value?: TEntity | PromiseLike<TEntity>
  ) => void
  [types.state.EDIT_PROMISE_REJECT]: (reason?: any) => void
  [types.state.EDIT_PROMISE_SUBJECT]: TEntity
}

export class DialogEditableState<TEntity extends models.IEntity>
  extends dialog.DialogState
  implements IDialogEditableState<TEntity> {
  // tslint:disable-next-line:no-empty semicolon
  public [types.state.EDIT_PROMISE_REJECT]: (reason?: any) => void = () => {};

  public [types.state.EDIT_PROMISE_RESOLVE]: (
    value?: TEntity | PromiseLike<TEntity>
  ) => void = () => {}; // tslint:disable-line:no-empty semicolon

  public [types.state.EDIT_PROMISE_SUBJECT]: TEntity = {} as TEntity
}
