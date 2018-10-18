import { Module } from 'vuex'
import * as models from '../../models'
import { IDetailEditableState } from './detail-editable-state'
import { IDetailEditableGetter } from './detail-editable-getter'
import {
  IDetailEditableGetters,
  DetailEditableGetters
} from './detail-editable-getters'
import {
  DefaultDetailEditableActions,
  IDetailEditableActions
} from './detail-editable-actions'
import {
  IDetailEditableMutations,
  DetailEditableMutations
} from './detail-editable-mutations'
import { IDetailEditableModules } from './detail-editable-modules'
import { IDetailEditable, DetailEditable } from './detail-editable'
import * as frame from '../frame'
import * as types from './types'
export function factory<
  TEntity extends models.IEntity,
  TState extends IDetailEditableState<TEntity> = IDetailEditableState<TEntity>,
  TGetter extends IDetailEditableGetter<
    TEntity,
    TState
  > = IDetailEditableGetter<TEntity, TState>
>(options?: {
  state?: () => TState
  apis?: {
    save?: (
      context: frame.IFrameActionContext<TState, TGetter>
    ) => Promise<models.IResponse<TEntity>>
    load?: (
      context: frame.IFrameActionContext<TState, TGetter>
    ) => Promise<models.IResponse<TEntity>>
  }
  extra?: {
    getters?: {
      [key: string]: (state: TState, getters: TGetter) => void
    }
    actions?: {
      [key: string]: (
        context: frame.IFrameActionContext<TState, TGetter>,
        payload?: any
      ) => any | void
    }
    mutations?: {
      [key: string]: (state: TState, payload?: any) => void
    }
    modules?: {
      [key: string]: Module<any, any>
    }
  }
}): IDetailEditable<TEntity, TState, TGetter> {
  let args = {} as {
    state: () => TState
    getters: IDetailEditableGetters<TEntity, TState>
    actions?: IDetailEditableActions<TEntity, TState, TGetter>
    mutations: IDetailEditableMutations<TEntity, TState>
    modules?: IDetailEditableModules<TEntity>
  }
  if (options) {
    if (options.state) {
      args.state = options.state
    }
    if (options.apis) {
      args.actions = new DefaultDetailEditableActions<
        TEntity,
        TState,
        TGetter
      >()
      if (options.apis.save) {
        args.actions[types.actions.API_SAVE] = options.apis.save
      }
      if (options.apis.load) {
        args.actions[types.actions.API_LOAD] = options.apis.load
      }
    }
    if (options.extra) {
      if (options.extra.getters) {
        if (!args.getters) {
          args.getters = new DetailEditableGetters<TEntity, TState>()
        }
        for (let key in options.extra.getters) {
          args.getters[key] = options.extra.getters[key]
        }
      }
      if (options.extra.actions) {
        if (!args.actions) {
          args.actions = new DefaultDetailEditableActions<TEntity, TState>()
        }
        for (let key in options.extra.actions) {
          args.actions[key] = options.extra.actions[key]
        }
      }
      if (options.extra.mutations) {
        if (!args.mutations) {
          args.mutations = new DetailEditableMutations<TEntity, TState>()
        }
        for (let key in options.extra.mutations) {
          args.mutations[key] = options.extra.mutations[key]
        }
      }
    }
  }
  return new DetailEditable<TEntity, TState, TGetter>(args)
}
