import * as models from '../../models'
import * as frame from '../frame'
import { IDetailActions } from './detail-actions'
import { IDetailGetter } from './detail-getter'
import { IDetailGetters } from './detail-getters'
import { IDetailModules } from './detail-modules'
import { IDetailMutations } from './detail-mutations'
import { IDetailState } from './detail-state'
export interface IDetail<
  TEntity extends models.IEntity,
  TState extends IDetailState<TEntity> = IDetailState<TEntity>,
  TGetter extends IDetailGetter<TEntity, TState> = IDetailGetter<
    TEntity,
    TState
  >,
  TGetters extends IDetailGetters<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDetailGetters<TEntity, TState, TGetter, TRootState>,
  TActions extends IDetailActions<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDetailActions<TEntity, TState, TGetter, TRootState>,
  TMutations extends IDetailMutations<TEntity, TState> = IDetailMutations<
    TEntity,
    TState
  >,
  TModules extends IDetailModules<TRootState> = IDetailModules<TRootState>,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends frame.IFrame<
      TState,
      TGetter,
      TRootState,
      TGetters,
      TActions,
      TMutations
    > {}

export class Detail<
  TEntity extends models.IEntity,
  TState extends IDetailState<TEntity> = IDetailState<TEntity>,
  TGetter extends IDetailGetter<TEntity, TState> = IDetailGetter<
    TEntity,
    TState
  >,
  TGetters extends IDetailGetters<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDetailGetters<TEntity, TState, TGetter, TRootState>,
  TActions extends IDetailActions<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDetailActions<TEntity, TState, TGetter, TRootState>,
  TMutations extends IDetailMutations<TEntity, TState> = IDetailMutations<
    TEntity,
    TState
  >,
  TModules extends IDetailModules<TRootState> = IDetailModules<TRootState>,
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
    IDetail<
      TEntity,
      TState,
      TGetter,
      TGetters,
      TActions,
      TMutations,
      TModules,
      TRootState
    > {}
