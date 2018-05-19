import { IFrameActions } from './frame-actions'
import { IFrameGetter } from './frame-getter'
import { IFrameGetters } from './frame-getters'
import { IFrameModules } from './frame-modules'
import { IFrameMutations } from './frame-mutations'
import { IFrameState } from './frame-state'
export interface IFrameModuleOptions<
  TState extends IFrameState,
  TRootState extends IFrameState,
  TGetter extends IFrameGetter = IFrameGetter,
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
> {
  state?: () => TState
  actions?: TActions
  getters?: TGetters
  mutations?: TMutations
  modules?: TModules
}
