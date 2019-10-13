// @flow

/* Selector */
export const getDataState = (state) => state.data;

export const getCameraState = (state) => getDataState(state).camera;
