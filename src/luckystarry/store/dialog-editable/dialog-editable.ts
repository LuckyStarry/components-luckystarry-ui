import * as models from '../../models'
import * as dialog from '../dialog'
import * as frame from '../frame'
import {
  IDialogEditableActions,
  DialogEditableActions
} from './dialog-editable-actions'
import { IDialogEditableGetter } from './dialog-editable-getter'
import {
  IDialogEditableGetters,
  DialogEditableGetters
} from './dialog-editable-getters'
import {
  IDialogEditableModules,
  DefaultDialogEditableModules
} from './dialog-editable-modules'
import {
  IDialogEditableMutations,
  DialogEditableMutations
} from './dialog-editable-mutations'
import {
  IDialogEditableState,
  DialogEditableState
} from './dialog-editable-state'
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
    > {
  constructor(
    options?: frame.IFrameModuleOptions<
      TState,
      TRootState,
      TGetter,
      TGetters,
      TActions,
      TMutations,
      TModules
    >
  ) {
    super(
      frame.utils.OptionsMerge(
        {
          state: () => new DialogEditableState<TEntity>(),
          getters: new DialogEditableGetters<
            TEntity,
            TState,
            TGetter,
            TRootState
          >(),
          actions: new DialogEditableActions<
            TEntity,
            TState,
            TGetter,
            TRootState
          >(),
          mutations: new DialogEditableMutations<TEntity, TState>(),
          modules: new DefaultDialogEditableModules<TEntity, TRootState>()
        },
        options
      )
    )
  }
}
