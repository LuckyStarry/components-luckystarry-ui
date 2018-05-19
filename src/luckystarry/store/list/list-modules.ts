import * as frame from '../frame'

export interface IListModules<
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.IFrameModules<TRootState> {}

export class ListModules<
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.FrameModules<TRootState> implements IListModules<TRootState> {}
