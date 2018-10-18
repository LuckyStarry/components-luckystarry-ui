import { Module } from 'vuex'
import { IFrameActions } from './frame-actions'
import { IFrameGetter } from './frame-getter'
import { IFrameGetters } from './frame-getters'
import { IFrameModuleOptions } from './frame-module-options'
import { IFrameModules } from './frame-modules'
import { IFrameMutations } from './frame-mutations'
import { IFrameState } from './frame-state'
import * as utils from './utils'

export interface IFrame<
  TState extends IFrameState = IFrameState,
  TGetter extends IFrameGetter = IFrameGetter,
  TRootState extends IFrameState = IFrameState,
  TGetters extends IFrameGetters<TState, TRootState> = IFrameGetters<
    TState,
    TRootState
  >,
  TActions extends IFrameActions<TState, TGetter, TRootState> = IFrameActions<
    TState,
    TGetter,
    TRootState
  >,
  TMutations extends IFrameMutations<TState> = IFrameMutations<TState>,
  TModules extends IFrameModules<TRootState> = IFrameModules<TRootState>
> extends Module<TState, TRootState> {
  readonly namespaced: boolean
  readonly getters: TGetters
  readonly actions: TActions
  readonly mutations: TMutations
  readonly modules: TModules
}

export class Frame<
  TState extends IFrameState = IFrameState,
  TGetter extends IFrameGetter = IFrameGetter,
  TRootState extends IFrameState = IFrameState,
  TGetters extends IFrameGetters<TState, TRootState> = IFrameGetters<
    TState,
    TRootState
  >,
  TActions extends IFrameActions<TState, TGetter, TRootState> = IFrameActions<
    TState,
    TGetter,
    TRootState
  >,
  TMutations extends IFrameMutations<TState> = IFrameMutations<TState>,
  TModules extends IFrameModules<TRootState> = IFrameModules<TRootState>
>
  implements
    IFrame<
      TState,
      TGetter,
      TRootState,
      TGetters,
      TActions,
      TMutations,
      TModules
    > {
  private options: IFrameModuleOptions<
    TState,
    TRootState,
    TGetter,
    TGetters,
    TActions,
    TMutations,
    TModules
  >
  constructor(
    options?: IFrameModuleOptions<
      TState,
      TRootState,
      TGetter,
      TGetters,
      TActions,
      TMutations,
      TModules
    >
  ) {
    this.options = utils.OptionsMerge({}, options)
  }

  get namespaced(): boolean {
    return true
  }

  get state(): () => TState {
    if (this.options) {
      return this.options.state
    }
  }

  get getters(): TGetters {
    if (this.options) {
      return this.options.getters
    }
  }

  get actions(): TActions {
    if (this.options) {
      return this.options.actions
    }
  }

  get mutations(): TMutations {
    if (this.options) {
      return this.options.mutations
    }
  }

  get modules(): TModules {
    if (this.options) {
      return this.options.modules
    }
  }
}
