import * as dialog from '../dialog'
import * as models from '../../models'
import * as types from './types'
import { IDialogEditableState } from './dialog-editable-state'

export interface IDialogEditableGetter<
  TEntity extends models.IEntity,
  TState extends IDialogEditableState<TEntity> = IDialogEditableState<TEntity>
> extends dialog.IDialogGetter {
  [types.getters.EDIT_PROMISE_RESOLVE]: (
    value?: TEntity | PromiseLike<TEntity>
  ) => void
  [types.getters.EDIT_PROMISE_REJECT]: (reason?: any) => void
  [types.getters.EDIT_PROMISE_SUBJECT]: TEntity
}
