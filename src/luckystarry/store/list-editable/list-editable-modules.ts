import * as frame from '../frame'
import * as list from '../list'
import * as types from './types'

export interface IListEditableModules<
  TRootState extends frame.IFrameState = frame.IFrameState
> extends list.IListModules<TRootState> {}

export class ListModules<
  TRootState extends frame.IFrameState = frame.IFrameState
> extends list.ListModules<TRootState>
  implements IListEditableModules<TRootState> {}
