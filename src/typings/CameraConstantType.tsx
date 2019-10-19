/**
 * Expo camera does not export the types by default
 */
import Camera from 'expo-camera';

export type CameraFlashModeType =
  | typeof Camera.Constants.FlashMode.on
  | typeof Camera.Constants.FlashMode.off
  | typeof Camera.Constants.FlashMode.auto
  | typeof Camera.Constants.FlashMode.torch;

export type CameraType =
  | typeof Camera.Constants.Type.front
  | typeof Camera.Constants.Type.back;
