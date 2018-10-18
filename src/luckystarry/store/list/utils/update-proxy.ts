import { IListState } from '../list-state'
import { IListGetter } from '../list-getter'
import { IFrameActionContext } from '../../frame/frame-action-context'
import * as models from '../../../models'
import * as types from '../types'

export async function UpdateProxy<
  TEntity extends models.IEntity,
  TState extends IListState<TEntity> = IListState<TEntity>,
  TGetter extends IListGetter<TEntity> = IListGetter<TEntity>
>(
  context: IFrameActionContext<TState, TGetter>,
  payload: {
    original: TEntity
    process: (model: TEntity) => Promise<TEntity>
  }
): Promise<TEntity> {
  return await context.dispatch(types.actions.UPDATE_PROXY, payload)
}
