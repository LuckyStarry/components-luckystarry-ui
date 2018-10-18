import * as frame from '../frame'
import * as list from '../list'
import * as models from '../../models'
import * as dialog from '../dialog'
import { IListEditableState, ListEditableState } from './list-editable-state'
import { IListEditableGetter } from './list-editable-getter'
import {
  IListEditableGetters,
  ListEditableGetters
} from './list-editable-getters'
import {
  IListEditableActions,
  DefaultListEditableActions
} from './list-editable-actions'
import {
  IListEditableModules,
  DefaultListEditableModules
} from './list-editable-modules'
import {
  IListEditableMutations,
  ListEditableMutations
} from './list-editable-mutations'
export interface IListEditable<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<TEntity, TQuery> = IListEditableState<
    TEntity,
    TQuery
  >,
  TGetter extends IListEditableGetter<
    TEntity,
    TQuery,
    TState
  > = IListEditableGetter<TEntity, TQuery, TState>,
  TGetters extends IListEditableGetters<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListEditableGetters<TEntity, TQuery, TState, TGetter, TRootState>,
  TActions extends IListEditableActions<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListEditableActions<TEntity, TQuery, TState, TGetter, TRootState>,
  TMutations extends IListEditableMutations<
    TEntity,
    TQuery,
    TState
  > = IListEditableMutations<TEntity, TQuery, TState>,
  TDialogEditable extends dialog.editable.IDialogEditable<
    TEntity
  > = dialog.editable.IDialogEditable<TEntity>,
  TModules extends IListEditableModules<
    TEntity,
    TDialogEditable,
    TRootState
  > = IListEditableModules<TEntity, TDialogEditable, TRootState>,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends list.IList<
      TEntity,
      TQuery,
      TState,
      TGetter,
      TGetters,
      TActions,
      TMutations,
      TModules,
      TRootState
    > {}

export class ListEditable<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<TEntity, TQuery> = IListEditableState<
    TEntity,
    TQuery
  >,
  TGetter extends IListEditableGetter<
    TEntity,
    TQuery,
    TState
  > = IListEditableGetter<TEntity, TQuery, TState>,
  TGetters extends IListEditableGetters<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListEditableGetters<TEntity, TQuery, TState, TGetter, TRootState>,
  TActions extends IListEditableActions<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListEditableActions<TEntity, TQuery, TState, TGetter, TRootState>,
  TMutations extends IListEditableMutations<
    TEntity,
    TQuery,
    TState
  > = IListEditableMutations<TEntity, TQuery, TState>,
  TDialogEditable extends dialog.editable.IDialogEditable<
    TEntity
  > = dialog.editable.IDialogEditable<TEntity>,
  TModules extends IListEditableModules<
    TEntity,
    TDialogEditable,
    TRootState
  > = IListEditableModules<TEntity, TDialogEditable, TRootState>,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends list.List<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TGetters,
    TActions,
    TMutations,
    TModules,
    TRootState
  >
  implements
    IListEditable<
      TEntity,
      TQuery,
      TState,
      TGetter,
      TGetters,
      TActions,
      TMutations,
      TDialogEditable,
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
          state: () => new ListEditableState({ query: new models.Query() }),
          getters: new ListEditableGetters(),
          actions: new DefaultListEditableActions(),
          mutations: new ListEditableMutations(),
          modules: new DefaultListEditableModules()
        },
        options
      )
    )
  }
}
