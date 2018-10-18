import * as dialog from '../dialog'
import * as frame from '../frame'
import * as detail from '../detail'
import * as types from './types'
import * as models from '../../models'

export interface IDialogEditableModules<
  TEntity extends models.IEntity,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends dialog.IDialogModules<TRootState> {
  [types.modules.EDITOR]: detail.editable.IDetailEditable<TEntity>
}

export class DialogEditableModules<
  TEntity extends models.IEntity,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends dialog.DialogModules<TRootState>
  implements IDialogEditableModules<TEntity, TRootState> {
  public [types.modules.EDITOR]: detail.editable.IDetailEditable<TEntity>
}

export class DefaultDialogEditableModules<
  TEntity extends models.IEntity,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends DialogEditableModules<TEntity, TRootState> {
  constructor() {
    super()
    this[types.modules.EDITOR] = new detail.editable.DetailEditable<TEntity>()
  }
}
