import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

/* Components */
import { StyleSheet, View, Text } from 'react-native';
import { Camera } from 'expo-camera';

/* Actions */
import { changeCapturingState } from '../../actions/CameraAction';

/* Selectors */
import { getIsCapturingPhoto, getCameraType } from '../../reducers/CameraReducer';

/* Utils */
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

/* Constants */
const CAMERA_PERMISSION = {
  CHECKING: 0,
  DISALLOWED: 1,
  GRANTED: 2,
};

/* Types */
import { Dispatch } from 'redux';
import { FullStatesType } from '../../typings/DataType';
import { CameraType } from '../../typings/CameraConstantType';

declare interface PropsType {
  isCapturing: boolean;
  cameraType: CameraType;
  completeCapturing: () => void;
}

const mapStateToProps = (state: FullStatesType) => ({
  isCapturing: getIsCapturingPhoto(state),
  cameraType: getCameraType(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  completeCapturing: () => dispatch(changeCapturingState(false)),
});

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

const CameraContainer = ({ isCapturing, cameraType, completeCapturing }: PropsType) => {
  // Refs
  const cameraRef = useRef<Camera>(null);

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

  const checkCameraRollPermission = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  useEffect(() => {
    checkCameraPermission();
    checkCameraRollPermission();
  }, []);

  const onPictureSaved = async (photo: any) => {
    const { uri } = photo;
    await MediaLibrary.createAssetAsync(uri);
  };

  useEffect(() => {
    if (isCapturing) {
      if (cameraRef && cameraRef.current) {
        cameraRef.current.takePictureAsync({
          quality: 1.0,
          exif: false,
          onPictureSaved,
        });
      }
      completeCapturing();
    }
  }, [isCapturing]);

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
        ref={cameraRef}
        style={styles.cameraWrapper}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.auto}
        autoFocus={Camera.Constants.AutoFocus.on}
      >
        <View style={styles.cameraViewWrapper} />
      </Camera>
    </View>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraContainer);
