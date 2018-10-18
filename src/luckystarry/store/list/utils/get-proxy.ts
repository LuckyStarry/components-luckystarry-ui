import { IListState } from '../list-state'
import { IListGetter } from '../list-getter'
import { IFrameActionContext } from '../../frame/frame-action-context'
import * as models from '../../../models'
import * as types from '../types'
import { store } from 'luckystarry'

export async function GetProxy<
  TEntity extends models.IEntity,
  TState extends IListState<TEntity> = IListState<TEntity>,
  TGetter extends IListGetter<TEntity> = IListGetter<TEntity>
>(
  context: IFrameActionContext<TState, TGetter>,
  original: TEntity
): Promise<models.IResponse<TEntity>> {
  return await store.frame.utils.ApiProxy<TEntity>(
    context,
    async () => await context.dispatch(types.actions.API_GET, original)
  )
}
