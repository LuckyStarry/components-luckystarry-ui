import * as models from '../../models'
import * as detail from '../detail-editable'
import * as dialog from '../dialog'
import * as frame from '../frame'
import { IDialogEditableGetter } from './dialog-editable-getter'
import { IDialogEditableState } from './dialog-editable-state'
import * as types from './types'

export interface IDialogEditableActions<
  TEntity extends models.IEntity,
  TState extends IDialogEditableState<TEntity> = IDialogEditableState<TEntity>,
  TGetter extends IDialogEditableGetter<
    TEntity,
    TState
  > = IDialogEditableGetter<TEntity, TState>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends dialog.IDialogActions<TState, TGetter, TRootState> {
  [types.actions.EDIT](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    subject: TEntity
  )
}

export abstract class DialogEditableActions<
  TEntity extends models.IEntity,
  TState extends IDialogEditableState<TEntity> = IDialogEditableState<TEntity>,
  TGetter extends IDialogEditableGetter<
    TEntity,
    TState
  > = IDialogEditableGetter<TEntity, TState>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends dialog.DialogActions<TState, TGetter, TRootState>
  implements IDialogEditableActions<TEntity, TState, TGetter, TRootState> {
  public async [types.actions.EDIT](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>,
    subject: TEntity
  ): Promise<TEntity> {
    return new Promise<TEntity>(async (resolve, reject) => {
      context.commit(types.mutations.EDIT_PROMISE_RESET, { resolve, reject })
      await context.dispatch(detail.types.actions.SUBJECT_RESET, subject)
      await context.dispatch(dialog.types.actions.OPEN)
    })
  }

  public async [types.actions.SAVE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ) {
    try {
      let response: models.IResponse<TEntity> = await context.dispatch(
        `${types.modules.EDITOR}/${detail.types.actions.SAVE}`
      )
      if (response.IsSuccessful) {
        context.commit(
          types.mutations.EDIT_PROMISE_SUBJECT_RESET,
          response.Entity
        )
        context.dispatch(dialog.types.actions.CLOSE)
      }
    } catch (error) {
      context.dispatch(frame.types.actions.ON_EXCEPTION, error)
    }
  }

  public async [dialog.types.actions.CLOSE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ) {
    context.commit(dialog.types.mutations.VISIBLE_UPDATE, false)
    let subject = context.getters[types.getters.EDIT_PROMISE_SUBJECT]
    try {
      if (subject) {
        let resolve = context.getters[types.getters.EDIT_PROMISE_RESOLVE]
        resolve(subject)
      } else {
        let reject = context.getters[types.getters.EDIT_PROMISE_REJECT]
        reject()
      }
    } catch (error) {
      context.dispatch(frame.types.actions.ON_EXCEPTION, error)
    } finally {
      context.commit(types.mutations.EDIT_PROMISE_SUBJECT_RESET)
      context.commit(types.mutations.EDIT_PROMISE_RESET)
    }
  }
}
