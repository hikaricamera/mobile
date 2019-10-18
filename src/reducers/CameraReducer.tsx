/* Actions */
import { CAMERA_CHANGING_CAPTURING_STATE } from '../actions/CameraAction';

/* Types */
import { StatesType, ActionsType } from '../typings/CameraReduxType';
import { FullStatesType } from '../typings/DataType';

const DEFAULT_STATE = {
  capturingPhoto: false,
};

export default (state: StatesType = DEFAULT_STATE, action: ActionsType) => {
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
export const getCameraState = (state: FullStatesType) => state.camera;

export const getIsCapturingPhoto = (state: FullStatesType) =>
  getCameraState(state).capturingPhoto;
