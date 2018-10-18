import * as models from '../../models'
import * as detail from '../detail'
import * as types from './types'

export interface IDetailEditableState<TEntity extends models.IEntity>
  extends detail.IDetailState<TEntity> {
  [types.state.ORIGINAL]: TEntity
}

export class DetailEditableState<TEntity extends models.IEntity>
  extends detail.DetailState<TEntity>
  implements IDetailEditableState<TEntity> {
  public [types.state.ORIGINAL]: TEntity = {} as TEntity
}
