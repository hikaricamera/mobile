/* Types */
import { CameraFlashModeType } from '../typings/CameraConstantType';

export const CAMERA_CHANGING_CAPTURING_STATE: 'CAMERA_CHANGING_CAPTURING_STATE' =
  'CAMERA_CHANGING_CAPTURING_STATE';

export const CAMERA_CHANGE_FLASH_MODE: 'CAMERA_CHANGE_FLASH_MODE' =
  'CAMERA_CHANGE_FLASH_MODE';

export const changeCapturingState = (isCapturing: boolean) => ({
  type: CAMERA_CHANGING_CAPTURING_STATE,
  payload: isCapturing,
});

export const changeCameraFlashMode = (flashMode: CameraFlashModeType) => ({
  type: CAMERA_CHANGE_FLASH_MODE,
  payload: flashMode,
});
