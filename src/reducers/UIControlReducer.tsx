/* Actions */
import { UI_SET_STATUS_BAR_HEIGHT } from '../actions/UIControlAction';

const DEFAULT_STATE = {
  statusBarHeight: 0,
};

export default (state = DEFAULT_STATE, action: any) => {
  switch (action.type) {
    case UI_SET_STATUS_BAR_HEIGHT:
      return {
        ...state,
        statusBarHeight: action.payload,
      };
    default:
      break;
  }
  return state;
};

/* Selector */
export const getUIControlState = (state: any) => state.ui;

export const getStatusBarHeight = (state: any) =>
  getUIControlState(state).statusBarHeight;
