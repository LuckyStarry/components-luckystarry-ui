import * as frame from '../frame'
import { IDialogActions } from './dialog-actions'
import { IDialogGetter } from './dialog-getter'
import { IDialogGetters } from './dialog-getters'
import { IDialogModules } from './dialog-modules'
import { IDialogMutations } from './dialog-mutations'
import { IDialogState } from './dialog-state'
export interface IDialog<
  TState extends IDialogState = IDialogState,
  TGetter extends IDialogGetter<TState> = IDialogGetter<TState>,
  TGetters extends IDialogGetters<TState, TGetter, TRootState> = IDialogGetters<
    TState,
    TGetter,
    TRootState
  >,
  TActions extends IDialogActions<TState, TGetter, TRootState> = IDialogActions<
    TState,
    TGetter,
    TRootState
  >,
  TMutations extends IDialogMutations<TState> = IDialogMutations<TState>,
  TModules extends IDialogModules<TRootState> = IDialogModules<TRootState>,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends frame.IFrame<
      TState,
      TGetter,
      TRootState,
      TGetters,
      TActions,
      TMutations,
      TModules
    > {}

export class Dialog<
  TState extends IDialogState = IDialogState,
  TGetter extends IDialogGetter<TState> = IDialogGetter<TState>,
  TGetters extends IDialogGetters<TState, TGetter, TRootState> = IDialogGetters<
    TState,
    TGetter,
    TRootState
  >,
  TActions extends IDialogActions<TState, TGetter, TRootState> = IDialogActions<
    TState,
    TGetter,
    TRootState
  >,
  TMutations extends IDialogMutations<TState> = IDialogMutations<TState>,
  TModules extends IDialogModules<TRootState> = IDialogModules<TRootState>,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends frame.Frame<
    TState,
    TGetter,
    TRootState,
    TGetters,
    TActions,
    TMutations,
    TModules
  >
  implements
    IDialog<
      TState,
      TGetter,
      TGetters,
      TActions,
      TMutations,
      TModules,
      TRootState
    > {}
