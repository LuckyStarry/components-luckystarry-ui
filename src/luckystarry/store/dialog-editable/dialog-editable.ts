import * as models from '../../models'
import * as dialog from '../dialog'
import * as frame from '../frame'
import { IDialogEditableActions } from './dialog-editable-actions'
import { IDialogEditableGetter } from './dialog-editable-getter'
import { IDialogEditableGetters } from './dialog-editable-getters'
import { IDialogEditableModules } from './dialog-editable-modules'
import { IDialogEditableMutations } from './dialog-editable-mutations'
import { IDialogEditableState } from './dialog-editable-state'
export interface IDialogEditable<
  TEntity extends models.IEntity,
  TState extends IDialogEditableState<TEntity> = IDialogEditableState<TEntity>,
  TGetter extends IDialogEditableGetter<
    TEntity,
    TState
  > = IDialogEditableGetter<TEntity, TState>,
  TGetters extends IDialogEditableGetters<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDialogEditableGetters<TEntity, TState, TGetter, TRootState>,
  TActions extends IDialogEditableActions<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDialogEditableActions<TEntity, TState, TGetter, TRootState>,
  TMutations extends IDialogEditableMutations<
    TEntity,
    TState
  > = IDialogEditableMutations<TEntity, TState>,
  TModules extends IDialogEditableModules<
    TEntity,
    TRootState
  > = IDialogEditableModules<TEntity, TRootState>,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends dialog.IDialog<
      TState,
      TGetter,
      TGetters,
      TActions,
      TMutations,
      TModules,
      TRootState
    > {}

export class DialogEditable<
  TEntity extends models.IEntity,
  TState extends IDialogEditableState<TEntity> = IDialogEditableState<TEntity>,
  TGetter extends IDialogEditableGetter<
    TEntity,
    TState
  > = IDialogEditableGetter<TEntity, TState>,
  TGetters extends IDialogEditableGetters<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDialogEditableGetters<TEntity, TState, TGetter, TRootState>,
  TActions extends IDialogEditableActions<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDialogEditableActions<TEntity, TState, TGetter, TRootState>,
  TMutations extends IDialogEditableMutations<
    TEntity,
    TState
  > = IDialogEditableMutations<TEntity, TState>,
  TModules extends IDialogEditableModules<
    TEntity,
    TRootState
  > = IDialogEditableModules<TEntity, TRootState>,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends dialog.Dialog<
    TState,
    TGetter,
    TGetters,
    TActions,
    TMutations,
    TModules,
    TRootState
  >
  implements
    IDialogEditable<
      TEntity,
      TState,
      TGetter,
      TGetters,
      TActions,
      TMutations,
      TModules,
      TRootState
    > {}
