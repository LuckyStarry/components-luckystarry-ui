import * as frame from '../frame'

export interface IDetailModules<
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.IFrameModules<TRootState> {}

export class DetailModules<
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.FrameModules<TRootState>
  implements IDetailModules<TRootState> {}
