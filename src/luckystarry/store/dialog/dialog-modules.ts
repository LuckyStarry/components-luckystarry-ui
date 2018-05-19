import * as frame from '../frame'

export interface IDialogModules<
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.IFrameModules<TRootState> {}

export class DialogModules<
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.FrameModules<TRootState>
  implements IDialogModules<TRootState> {}
