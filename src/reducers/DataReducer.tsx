// @flow
import { combineReducers } from 'redux';

/* Reducers */
import CameraReducer from './CameraReducer';
import UIControlReducer from './UIControlReducer';

const reducers = {
  camera: CameraReducer,
  ui: UIControlReducer,
};

export default combineReducers(reducers);
