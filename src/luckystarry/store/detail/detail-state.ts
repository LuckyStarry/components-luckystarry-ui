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
  private subject: TEntity
  private loading: boolean = false

  public set [types.state.SUBJECT](value: TEntity) {
    this.subject = value
  }

  public get [types.state.SUBJECT](): TEntity {
    return this.subject
  }

  public set [types.state.LOADING_STATE](value: boolean) {
    this.loading = value
  }

  public get [types.state.LOADING_STATE](): boolean {
    return this.loading
  }
}
