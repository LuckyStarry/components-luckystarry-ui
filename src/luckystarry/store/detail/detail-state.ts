import * as models from '../../models'
import * as frame from '../frame'
import * as types from './types'

export interface IDetailState<TEntity extends models.IEntity>
  extends frame.IFrameState {
  [types.state.SUBJECT]: TEntity
  [types.state.LOADING_STATE]: boolean
}

export class DetailState<TEntity extends models.IEntity>
  implements IDetailState<TEntity> {
  // tslint:disable-next-line:semicolon
  public [types.state.SUBJECT]: TEntity = {} as TEntity;
  public [types.state.LOADING_STATE]: boolean = false
}
