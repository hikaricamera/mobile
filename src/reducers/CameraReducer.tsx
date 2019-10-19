/* Actions */
import {
  CAMERA_CHANGING_CAPTURING_STATE,
  CAMERA_CHANGE_CAMERA_TYPE,
} from '../actions/CameraAction';

/* Constant */
import { Camera } from 'expo-camera';

/* Types */
import { StatesType, ActionsType } from '../typings/CameraReduxType';
import { FullStatesType } from '../typings/DataType';

const DEFAULT_STATE = {
  capturingPhoto: false,
  cameraType: Camera.Constants.Type.back,
};

export default (state: StatesType = DEFAULT_STATE, action: ActionsType) => {
  switch (action.type) {
    case CAMERA_CHANGING_CAPTURING_STATE:
      return {
        ...state,
        capturingPhoto: action.payload,
      };
    case CAMERA_CHANGE_CAMERA_TYPE:
      return {
        ...state,
        cameraType: action.payload,
      };
    default:
      break;
  }
  return state;
};

/* Selector */
export const getCameraState = (state: FullStatesType) => state.camera;

export const getIsCapturingPhoto = (state: FullStatesType) =>
  getCameraState(state).capturingPhoto;

export const getCameraType = (state: FullStatesType) =>
  getCameraState(state).cameraType;
