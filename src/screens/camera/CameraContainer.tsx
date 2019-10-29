import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

/* Components */
import { StyleSheet, View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import CameraPinchBox from './CameraPinchBox';

/* Actions */
import { changeCapturingState } from '../../actions/CameraAction';

/* Selectors */
import {
  getIsCapturingPhoto,
  getCameraType,
  getCameraFlashMode,
} from '../../reducers/CameraReducer';

/* Utils */
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

/* Constants */
import {
  CAMERA_MAX_ZOOM,
  CAMERA_MIN_ZOOM,
  CAMERA_ZOOM_PINCH_ATTENUATION,
  CAMERA_ZOOM_OUT_PINCH_ATTENUATION,
} from '../../constants/CameraConstants';
const CAMERA_PERMISSION = {
  CHECKING: 0,
  DISALLOWED: 1,
  GRANTED: 2,
};

/* Types */
import { Dispatch } from 'redux';
import { FullStatesType } from '../../typings/DataType';
import {
  CameraTypeType,
  CameraFlashModeType,
} from '../../typings/CameraConstantType';

declare interface PropsType {
  isCapturing: boolean;
  cameraType: CameraTypeType;
  cameraFlashMode: CameraFlashModeType;
  completeCapturing: () => void;
}

const mapStateToProps = (state: FullStatesType) => ({
  isCapturing: getIsCapturingPhoto(state),
  cameraFlashMode: getCameraFlashMode(state),
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

const CameraContainer = ({
  isCapturing,
  cameraType,
  cameraFlashMode,
  completeCapturing,
}: PropsType) => {
  // Refs
  const cameraRef = useRef<Camera>(null);

  // States
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(
    CAMERA_PERMISSION.CHECKING,
  );
  const [zoom, setZoom] = useState<number>(0.001);

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

  const onPictureSaved = async (photo: any) => {
    const { uri } = photo;
    await MediaLibrary.createAssetAsync(uri);
  };

  const onChangeZoom = (scale: number, velocity: number) => {
    let finalScale = 1;
    if (velocity > 0) {
      finalScale = 1 + (1.1 * scale) / CAMERA_ZOOM_PINCH_ATTENUATION;
    } else {
      finalScale = 1 - scale / CAMERA_ZOOM_OUT_PINCH_ATTENUATION;
    }
    const newZoom = zoom * finalScale;

    const clampedNewZoom = Math.max(
      CAMERA_MIN_ZOOM,
      Math.min(CAMERA_MAX_ZOOM, newZoom),
    );
    setZoom(clampedNewZoom);
  };

  // Effects
  useEffect(() => {
    checkCameraPermission();
    checkCameraRollPermission();
  }, []);

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
        flashMode={cameraFlashMode}
        autoFocus={Camera.Constants.AutoFocus.on}
        zoom={zoom}
      >
        <CameraPinchBox onChangeZoom={onChangeZoom} />
      </Camera>
    </View>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraContainer);
