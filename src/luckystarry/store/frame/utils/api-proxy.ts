import { IFrameState } from '../frame-state'
import { IFrameGetter } from '../frame-getter'
import { IFrameActionContext } from '../frame-action-context'
import * as models from '../../../models'
import * as types from '../types'

export async function ApiProxy<
  T,
  TState extends IFrameState = IFrameState,
  TGetter extends IFrameGetter = IFrameGetter,
  TRootState extends IFrameState = IFrameState
>(
  context: IFrameActionContext<TState, TGetter, TRootState>,
  payload: () => Promise<models.IResponse<T>>
): Promise<models.IResponse<T>> {
  return await context.dispatch(types.actions.API_PROXY, payload, {
    root: true
  })
}
