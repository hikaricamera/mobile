/* Actions */
import {
  changeCapturingState,
  changeCameraFlashMode,
} from '../actions/CameraAction';

export type ChangeCapturingStateType = ReturnType<typeof changeCapturingState>;
export type ChangeFlashModeType = ReturnType<typeof changeCameraFlashMode>;

export type ActionsType = ChangeCapturingStateType | ChangeFlashModeType;

export declare interface StatesType {
  capturingPhoto: boolean;
}
