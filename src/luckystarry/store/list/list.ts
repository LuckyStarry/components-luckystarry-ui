import * as frame from '../frame'
import * as models from '../../models'
import { IListState, ListState } from './list-state'
import { IListGetter } from './list-getter'
import { IListGetters, ListGetters } from './list-getters'
import { IListActions, DefaultListActions } from './list-actions'
import { IListModules } from './list-modules'
import { IListMutations, ListMutations } from './list-mutations'
export interface IList<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>,
  TGetter extends IListGetter<TEntity, TQuery, TState> = IListGetter<
    TEntity,
    TQuery,
    TState
  >,
  TGetters extends IListGetters<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListGetters<TEntity, TQuery, TState, TGetter, TRootState>,
  TActions extends IListActions<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListActions<TEntity, TQuery, TState, TGetter, TRootState>,
  TMutations extends IListMutations<TEntity, TQuery, TState> = IListMutations<
    TEntity,
    TQuery,
    TState
  >,
  TModules extends IListModules<TRootState> = IListModules<TRootState>,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends frame.IFrame<
      TState,
      TGetter,
      TRootState,
      TGetters,
      TActions,
      TMutations,
      TModules
    > {}

export class List<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>,
  TGetter extends IListGetter<TEntity, TQuery, TState> = IListGetter<
    TEntity,
    TQuery,
    TState
  >,
  TGetters extends IListGetters<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListGetters<TEntity, TQuery, TState, TGetter, TRootState>,
  TActions extends IListActions<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListActions<TEntity, TQuery, TState, TGetter, TRootState>,
  TMutations extends IListMutations<TEntity, TQuery, TState> = IListMutations<
    TEntity,
    TQuery,
    TState
  >,
  TModules extends IListModules<TRootState> = IListModules<TRootState>,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends frame.Frame<
    TState,
    TGetter,
    TRootState,
    TGetters,
    TActions,
    TMutations,
    TModules
  >
  implements
    IList<
      TEntity,
      TQuery,
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
          state: () => new ListState<TEntity, TQuery>(),
          getters: new ListGetters<
            TEntity,
            TQuery,
            TState,
            TGetter,
            TRootState
          >(),
          actions: new DefaultListActions(),
          mutations: new ListMutations()
        },
        options
      )
    )
  }
}
