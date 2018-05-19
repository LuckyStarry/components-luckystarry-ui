import * as detail from '../detail'
import * as frame from '../frame'

export interface IDetailEditableModules<
  TRootState extends frame.IFrameState = frame.IFrameState
> extends detail.IDetailModules<TRootState> {}

export class DetailEditableModules<
  TRootState extends frame.IFrameState = frame.IFrameState
> extends detail.DetailModules<TRootState>
  implements IDetailEditableModules<TRootState> {}
