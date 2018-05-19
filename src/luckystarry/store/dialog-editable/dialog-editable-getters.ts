import * as models from '../../models'
import * as dialog from '../dialog'
import * as frame from '../frame'
import * as types from './types'
import { IDialogEditableGetter } from './dialog-editable-getter'
import { IDialogEditableState } from './dialog-editable-state'

export interface IDialogEditableGetters<
  TEntity extends models.IEntity,
  TState extends IDialogEditableState<TEntity> = IDialogEditableState<TEntity>,
  TGetter extends IDialogEditableGetter<TEntity> = IDialogEditableGetter<
    TEntity
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends dialog.IDialogGetters<TState, TGetter, TRootState> {
  [types.getters.EDIT_PROMISE_RESOLVE]: (
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ) => ((value?: TEntity | PromiseLike<TEntity>) => void)
  [types.getters.EDIT_PROMISE_REJECT]: (
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ) => ((reason?: any) => void)
  [types.getters.EDIT_PROMISE_SUBJECT]: (
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ) => TEntity
}

export class DialogEditableGetters<
  TEntity extends models.IEntity,
  TState extends IDialogEditableState<TEntity> = IDialogEditableState<TEntity>,
  TGetter extends IDialogEditableGetter<TEntity> = IDialogEditableGetter<
    TEntity
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends dialog.DialogGetters<TState, TGetter, TRootState>
  implements IDialogEditableGetters<TEntity, TState, TGetter, TRootState> {
  public [types.getters.EDIT_PROMISE_RESOLVE](
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ): ((value?: TEntity | PromiseLike<TEntity>) => void) {
    return state[types.state.EDIT_PROMISE_RESOLVE]
  }

  public [types.getters.EDIT_PROMISE_REJECT](
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ): ((reason?: any) => void) {
    return state[types.state.EDIT_PROMISE_REJECT]
  }

  public [types.getters.EDIT_PROMISE_SUBJECT](
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ): TEntity {
    return state[types.state.EDIT_PROMISE_SUBJECT]
  }
}
