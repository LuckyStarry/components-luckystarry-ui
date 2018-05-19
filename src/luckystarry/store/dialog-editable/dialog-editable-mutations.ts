import * as models from '../../models'
import * as dialog from '../dialog'
import { IDialogEditableState } from './dialog-editable-state'
import * as types from './types'

export interface IDialogEditableMutations<
  TEntity extends models.IEntity,
  TState extends IDialogEditableState<TEntity> = IDialogEditableState<TEntity>
> extends dialog.IDialogMutations<TState> {
  [types.mutations.EDIT_PROMISE_RESET](
    state: TState,
    payload?: {
      resolve: (value?: TEntity | PromiseLike<TEntity>) => void
      reject: (reason?: any) => void
    }
  )

  [types.mutations.EDIT_PROMISE_SUBJECT_RESET](state: TState, subject: TEntity)
}

export class DialogEditableMutations<
  TEntity extends models.IEntity,
  TState extends IDialogEditableState<TEntity> = IDialogEditableState<TEntity>
> extends dialog.DialogMutations<TState>
  implements IDialogEditableMutations<TEntity, TState> {
  public [types.mutations.EDIT_PROMISE_RESET](
    state: TState,
    payload?: {
      resolve: (value?: TEntity | PromiseLike<TEntity>) => void
      reject: (reason?: any) => void
    }
  ) {
    state[types.state.EDIT_PROMISE_RESOLVE] = payload && payload.resolve
    state[types.state.EDIT_PROMISE_REJECT] = payload && payload.reject
  }

  public [types.mutations.EDIT_PROMISE_SUBJECT_RESET](
    state: TState,
    subject: TEntity
  ) {
    state[types.state.EDIT_PROMISE_SUBJECT] = subject
  }
}
