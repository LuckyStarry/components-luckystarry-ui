import { Module, ModuleTree } from 'vuex'
import { IFrameState } from './frame-state'

export interface IFrameModules<TRootState extends IFrameState = IFrameState>
  extends ModuleTree<TRootState> {}

export class FrameModules<TRootState extends IFrameState = IFrameState>
  implements IFrameModules<TRootState> {
  [key: string]: Module<any, TRootState>
}
