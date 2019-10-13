export const CAMERA_CHANGING_CAPTURING_STATE: 'CAMERA_CHANGING_CAPTURING_STATE' =
  'CAMERA_CHANGING_CAPTURING_STATE';

export const changeCapturingState = (isCapturing: boolean) => ({
  action: CAMERA_CHANGING_CAPTURING_STATE,
  payload: isCapturing,
});
