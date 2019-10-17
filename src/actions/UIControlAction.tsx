export const UI_SET_STATUS_BAR_HEIGHT: 'UI_SET_STATUS_BAR_HEIGHT' =
  'UI_SET_STATUS_BAR_HEIGHT';

export const setStatusBarHeight = (height: number) => ({
  type: UI_SET_STATUS_BAR_HEIGHT,
  payload: height,
});
