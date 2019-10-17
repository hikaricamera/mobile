/* Actions */
import { UI_SET_STATUS_BAR_HEIGHT } from '../actions/UIControlAction';

/* Types */
import { StatesType, ActionsType } from '../typings/UIControlReduxType';
import { FullStatesType } from '../typings/DataType';

const DEFAULT_STATE = {
  statusBarHeight: 0,
};

export default (state: StatesType = DEFAULT_STATE, action: ActionsType) => {
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
export const getUIControlState = (state: FullStatesType) => state.ui;

export const getStatusBarHeight = (state: FullStatesType) =>
  getUIControlState(state).statusBarHeight;
