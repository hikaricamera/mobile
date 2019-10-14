// @flow
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

/* Screens */
import CameraScreen from '../screens/camera/CameraScreen';

const CAMERA_SCREEN = 'CAMERA_SCREEN';

const MainNavigator = createSwitchNavigator({
  [CAMERA_SCREEN]: CameraScreen,
});

export default createAppContainer(MainNavigator);
