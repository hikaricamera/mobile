/* Actions */
import {
  changeCapturingState,
  changeCameraFlashMode,
  changeCameraType,
} from '../actions/CameraAction';
import { CameraType } from './CameraConstantType';

export type ChangeCapturingStateType = ReturnType<typeof changeCapturingState>;
export type ChangeFlashModeType = ReturnType<typeof changeCameraFlashMode>;
export type ChangeCameraTypeMode = ReturnType<typeof changeCameraType>;

export type ActionsType = ChangeCapturingStateType | ChangeFlashModeType | ChangeCameraTypeMode;

export declare interface StatesType {
  capturingPhoto: boolean;
  cameraType: CameraType;
}
