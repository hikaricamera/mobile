/* Actions */
import { CAMERA_CHANGING_CAPTURING_STATE } from '../actions/CameraAction';

const DEFAULT_STATE = {
  capturingPhoto: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CAMERA_CHANGING_CAPTURING_STATE:
      return {
        ...state,
        capturingPhoto: action.payload,
      };
    default:
      break;
  }
  return state;
};

/* Selector */
export const getCameraState = (state) => state.camera;

export const getIsCapturingPhoto = (state) =>
  getCameraState(state).capturingPhoto;
