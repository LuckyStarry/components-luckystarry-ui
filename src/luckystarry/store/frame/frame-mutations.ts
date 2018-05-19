import { MutationTree } from 'vuex'
import { IFrameState } from './frame-state'

export interface IFrameMutations<TState extends IFrameState>
  extends MutationTree<TState> {}

export class FrameMutations<TState extends IFrameState>
  implements IFrameMutations<TState> {
  [key: string]: (state: TState, payload: any) => any
}
