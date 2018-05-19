import * as models from '../../models'
import * as frame from '../frame'
import { IDetailState } from './detail-state'
import * as types from './types'

export interface IDetailGetter<
  TEntity extends models.IEntity,
  TState extends IDetailState<TEntity> = IDetailState<TEntity>
> extends frame.IFrameGetter {
  readonly [types.getters.SUBJECT]: TEntity
  readonly [types.getters.LOADING_STATE]: boolean
}
