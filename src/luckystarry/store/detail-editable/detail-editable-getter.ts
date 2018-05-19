import * as models from '../../models'
import * as detail from '../detail'
import { IDetailEditableState } from './detail-editable-state'
import * as types from './types'

export interface IDetailEditableGetter<
  TEntity extends models.IEntity,
  TState extends IDetailEditableState<TEntity> = IDetailEditableState<TEntity>
> extends detail.IDetailState<TEntity> {
  readonly [types.getters.ORIGINAL]: TEntity
}
