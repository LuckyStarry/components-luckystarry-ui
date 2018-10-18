import { IListEditableState } from './list-editable-state'
import { IListEditableGetter } from './list-editable-getter'
import { IListEditable, ListEditable } from './list-editable'
import {
  IListEditableActions,
  DefaultListEditableActions
} from './list-editable-actions'
import {
  IListEditableMutations,
  ListEditableMutations
} from './list-editable-mutations'
import { IListEditableModules } from './list-editable-modules'
import * as frame from '../frame'
import * as list from '../list'
import * as detail from '../detail'
import * as dialog from '../dialog'
import * as types from './types'
import * as models from '../../models'
import { Module } from 'vuex'

export function factory<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListEditableState<TEntity, TQuery> = IListEditableState<
    TEntity,
    TQuery
  >,
  TGetter extends IListEditableGetter<
    TEntity,
    TQuery,
    TState
  > = IListEditableGetter<TEntity, TQuery, TState>,
  UState extends detail.editable.IDetailEditableState<
    TEntity
  > = detail.editable.IDetailEditableState<TEntity>,
  UGetter extends detail.editable.IDetailEditableGetter<
    TEntity
  > = detail.editable.IDetailEditableGetter<TEntity>
>(options?: {
  state?: () => TState
  apis?: {
    create?: (
      context: frame.IFrameActionContext<TState, TGetter>
    ) => Promise<models.IResponse<TEntity>>
    save?: (
      context: frame.IFrameActionContext<UState, UGetter>
    ) => Promise<models.IResponse<TEntity>>
    search?: (
      context: frame.IFrameActionContext<TState, TGetter>
    ) => Promise<models.IResponse<models.ISearchResultEntity<TEntity>>>
    get?: (
      context: frame.IFrameActionContext<TState, TGetter>,
      original: TEntity
    ) => Promise<models.IResponse<TEntity>>
  }
  extra?: {
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
}): IListEditable<TEntity, TQuery, TState, TGetter> {
  let args = {} as {
    state?: () => TState
    actions?: IListEditableActions<TEntity, TQuery, TState, TGetter>
    mutations: IListEditableMutations<TEntity, TQuery, TState>
    modules?: IListEditableModules<TEntity>
  }
  if (options) {
    if (options.state) {
      args.state = options.state
    }
    if (options.apis || (options.extra && options.extra.actions)) {
      args.actions = new DefaultListEditableActions<
        TEntity,
        TQuery,
        TState,
        TGetter
      >()
      if (options.apis.search) {
        args.actions[types.actions.API_SEARCH] = options.apis.search
      }
      if (options.apis.create) {
        args.actions[list.editable.types.actions.API_CRAETE] =
          options.apis.create
      }
      if (options.apis.get) {
        args.actions[list.editable.types.actions.API_GET] = options.apis.get
      }
      if (options.apis.save) {
        if (!args.modules) {
          args.modules = new list.editable.ListEditableModules<TEntity>()
        }
        args.modules[
          list.editable.types.modules.EDIT_DIALOG
        ] = dialog.editable.factory<TEntity>({
          apis: {
            save: options.apis.save
          }
        })
      }
    }
    if (options.extra) {
      if (options.extra.actions) {
        for (let key in options.extra.actions) {
          args.actions[key] = options.extra.actions[key]
        }
      }
      if (options.extra.mutations) {
        args.mutations = new ListEditableMutations<TEntity, TQuery, TState>()
        for (let key in options.extra.mutations) {
          args.mutations[key] = options.extra.mutations[key]
        }
      }
      if (options.extra.modules) {
        if (!args.modules) {
          args.modules = new list.editable.ListEditableModules<TEntity>()
        }
        for (let key in options.extra.modules) {
          args.modules[key] = options.extra.modules[key]
        }
      }
    }
  }
  return new ListEditable<TEntity, TQuery, TState, TGetter>(args)
}
