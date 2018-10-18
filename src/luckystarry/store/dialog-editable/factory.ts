import * as models from '../../models'
import { IDialogEditableState } from './dialog-editable-state'
import { IDialogEditableGetter } from './dialog-editable-getter'
import { IDialogEditable, DialogEditable } from './dialog-editable'
import * as frame from '../frame'
import * as detail from '../detail'
import * as types from './types'
import {
  IDialogEditableModules,
  DialogEditableModules
} from './dialog-editable-modules'

export function factory<
  TEntity extends models.IEntity,
  TState extends IDialogEditableState<TEntity> = IDialogEditableState<TEntity>,
  TGetter extends IDialogEditableGetter<
    TEntity,
    TState
  > = IDialogEditableGetter<TEntity, TState>,
  UState extends detail.editable.IDetailEditableState<
    TEntity
  > = detail.editable.IDetailEditableState<TEntity>,
  UGetter extends detail.editable.IDetailEditableGetter<
    TEntity
  > = detail.editable.IDetailEditableGetter<TEntity>
>(options?: {
  state?: () => TState
  apis?: {
    save?: (
      context: frame.IFrameActionContext<UState, UGetter>
    ) => Promise<models.IResponse<TEntity>>
  }
}): IDialogEditable<TEntity, TState, TGetter> {
  let args = {} as {
    state: () => TState
    modules?: IDialogEditableModules<TEntity>
  }
  if (options) {
    if (options.state) {
      args.state = options.state
    }
    if (options.apis) {
      if (options.apis.save) {
        if (!args.modules) {
          args.modules = new DialogEditableModules<TEntity>()
        }
        args.modules[types.modules.EDITOR] = detail.editable.factory<
          TEntity,
          UState,
          UGetter
        >({ apis: { save: options.apis.save } })
      }
    }
  }
  return new DialogEditable<TEntity, TState, TGetter>(args)
}
