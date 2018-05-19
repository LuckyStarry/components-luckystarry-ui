import * as models from '../../models'
import * as detail from '../detail'
import * as frame from '../frame'
import { IDetailEditableActions } from './detail-editable-actions'
import { IDetailEditableGetter } from './detail-editable-getter'
import { IDetailEditableGetters } from './detail-editable-getters'
import { IDetailEditableModules } from './detail-editable-modules'
import { IDetailEditableMutations } from './detail-editable-mutations'
import { IDetailEditableState } from './detail-editable-state'
export interface IDetailEditable<
  TEntity extends models.IEntity,
  TState extends IDetailEditableState<TEntity> = IDetailEditableState<TEntity>,
  TGetter extends IDetailEditableGetter<
    TEntity,
    TState
  > = IDetailEditableGetter<TEntity, TState>,
  TGetters extends IDetailEditableGetters<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDetailEditableGetters<TEntity, TState, TGetter, TRootState>,
  TActions extends IDetailEditableActions<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDetailEditableActions<TEntity, TState, TGetter, TRootState>,
  TMutations extends IDetailEditableMutations<
    TEntity,
    TState
  > = IDetailEditableMutations<TEntity, TState>,
  TModules extends IDetailEditableModules<TRootState> = IDetailEditableModules<
    TRootState
  >,
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

export class DetailEditable<
  TEntity extends models.IEntity,
  TState extends IDetailEditableState<TEntity> = IDetailEditableState<TEntity>,
  TGetter extends IDetailEditableGetter<
    TEntity,
    TState
  > = IDetailEditableGetter<TEntity, TState>,
  TGetters extends IDetailEditableGetters<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDetailEditableGetters<TEntity, TState, TGetter, TRootState>,
  TActions extends IDetailEditableActions<
    TEntity,
    TState,
    TGetter,
    TRootState
  > = IDetailEditableActions<TEntity, TState, TGetter, TRootState>,
  TMutations extends IDetailEditableMutations<
    TEntity,
    TState
  > = IDetailEditableMutations<TEntity, TState>,
  TModules extends IDetailEditableModules<TRootState> = IDetailEditableModules<
    TRootState
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends detail.Detail<
    TEntity,
    TState,
    TGetter,
    TGetters,
    TActions,
    TMutations,
    TModules,
    TRootState
  >
  implements
    IDetailEditable<
      TEntity,
      TState,
      TGetter,
      TGetters,
      TActions,
      TMutations,
      TModules,
      TRootState
    > {}
