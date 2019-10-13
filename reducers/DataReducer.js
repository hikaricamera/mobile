// @flow
import { combineReducers } from 'redux';

/* Reducers */
import CameraReducer from './CameraReducer';

const reducers = {
  camera: CameraReducer,
};

export default combineReducers(reducers);
