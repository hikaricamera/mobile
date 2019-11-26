// @flow
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

/* Screens */
import CameraPermissionSwitch from '../screens/camera/CameraPermissionSwitch';

const CAMERA_SCREEN = 'CAMERA_SCREEN';

const MainNavigator = createSwitchNavigator({
  [CAMERA_SCREEN]: CameraPermissionSwitch,
});

export default createAppContainer(MainNavigator);
