/* Components */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera } from 'expo-camera';

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
  cameraWrapper: {
    flex: 1,
  },
  cameraViewWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: 200,
    height: 200,
  },
});

const CameraContainer = () => {
  // States
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(
    CAMERA_PERMISSION.CHECKING,
  );

  // Effects
  const checkCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      setCameraPermissionGranted(CAMERA_PERMISSION.GRANTED);
    } else {
      setCameraPermissionGranted(CAMERA_PERMISSION.DISALLOWED);
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  // Render
  if (cameraPermissionGranted === CAMERA_PERMISSION.CHECKING) {
    return <View />;
  } else if (cameraPermissionGranted === CAMERA_PERMISSION.DISALLOWED) {
    return (
      <View style={styles.wrapper}>
        <Text>Permissions Denied</Text>
      </View>
    );
  }
  return (
    <View style={styles.wrapper}>
      <Camera
        style={styles.cameraWrapper}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.auto}
        autoFocus={Camera.Constants.AutoFocus.on}
      >
        <View style={styles.cameraViewWrapper} />
      </Camera>
    </View>
  );
};

export default CameraContainer;
