import * as frame from '../frame'
import * as list from '../list'
import * as types from './types'
import * as dialog from '../dialog'
import { IEntity } from '../../models'

export interface IListEditableModules<
  TEntity extends IEntity,
  TDialogEditable extends dialog.editable.IDialogEditable<
    TEntity
  > = dialog.editable.IDialogEditable<TEntity>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends list.IListModules<TRootState> {
  [types.modules.EDIT_DIALOG]: TDialogEditable
}

export class ListEditableModules<
  TEntity extends IEntity,
  TDialogEditable extends dialog.editable.IDialogEditable<
    TEntity
  > = dialog.editable.IDialogEditable<TEntity>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends list.ListModules<TRootState>
  implements IListEditableModules<TEntity, TDialogEditable, TRootState> {
  public [types.modules.EDIT_DIALOG]: TDialogEditable
}

export class DefaultListEditableModules<
  TEntity extends IEntity
> extends ListEditableModules<TEntity> {
  constructor() {
    super()
    this[types.modules.EDIT_DIALOG] = new dialog.editable.DialogEditable<
      TEntity
    >()
  }
}
