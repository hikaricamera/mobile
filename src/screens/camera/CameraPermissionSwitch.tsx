import React, { useState, useEffect } from 'react';

/* Components */
import { StyleSheet, View, Text } from 'react-native';
import CameraMainScreen from './CameraMainScreen';

/* Utils */
import * as Permissions from 'expo-permissions';

/* Constants */
const CAMERA_PERMISSION = {
  CHECKING: 0,
  DISALLOWED: 1,
  GRANTED: 2,
};

/* Styles */
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

const CameraPermissionSwitch = () => {
  // States
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(
    CAMERA_PERMISSION.CHECKING,
  );

  // Helpers
  const checkCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      setCameraPermissionGranted(CAMERA_PERMISSION.GRANTED);
    } else {
      setCameraPermissionGranted(CAMERA_PERMISSION.DISALLOWED);
    }
  };

  const checkCameraRollPermission = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  // Effects
  useEffect(() => {
    checkCameraPermission();
    checkCameraRollPermission();
  }, []);

  // Render
  switch (cameraPermissionGranted) {
    case CAMERA_PERMISSION.CHECKING:
      return <View />;
    case CAMERA_PERMISSION.DISALLOWED:
      return (
        <View style={styles.wrapper}>
          <Text>Permissions Denied</Text>
        </View>
      );
    default:
      return <CameraMainScreen />;
  }
};

export default CameraPermissionSwitch;
