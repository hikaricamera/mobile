import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

/* Components */
import { StyleSheet, View } from 'react-native';
import { Camera } from 'expo-camera';
import CameraComplexGestureHandler from './CameraComplexGestureHandler';
import CameraZoomSlider from './CameraZoomSlider';

/* Actions */
import { changeCapturingState } from '../../actions/CameraAction';

/* Selectors */
import {
  getIsCapturingPhoto,
  getCameraType,
  getCameraFlashMode,
} from '../../reducers/CameraReducer';

/* Utils */
import * as MediaLibrary from 'expo-media-library';

/* Constants */
import {
  CAMERA_MAX_ZOOM,
  CAMERA_MIN_ZOOM,
  CAMERA_ZOOM_PINCH_ATTENUATION,
} from '../../constants/CameraConstants';

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
  const [zoom, setZoom] = useState<number>(0.001);
  const [isShowingZoomSlider, setIsShowingZoomSlider] = useState<boolean>(
    false,
  );

  // Helpers
  const onChangeZoom = (scale: number, velocity: number) => {
    const scaleDelta = velocity / CAMERA_ZOOM_PINCH_ATTENUATION;
    const newZoom = zoom + scaleDelta;

    const clampedNewZoom = Math.max(
      CAMERA_MIN_ZOOM,
      Math.min(CAMERA_MAX_ZOOM, newZoom),
    );
    setZoom(clampedNewZoom);
  };

  const onPictureSaved = async (photo: any) => {
    const { uri } = photo;
    await MediaLibrary.createAssetAsync(uri);
    completeCapturing();
  };

  // Effects
  useEffect(() => {
    if (isCapturing) {
      if (cameraRef && cameraRef.current) {
        cameraRef.current.takePictureAsync({
          quality: 1.0,
          exif: false,
          onPictureSaved,
        });
      }
    }
  }, [isCapturing]);

  // Render
  return (
    <View style={styles.wrapper}>
      <CameraZoomSlider
        zoom={zoom}
        setZoom={setZoom}
        setIsShowingZoomSlider={setIsShowingZoomSlider}
        isShowingZoomSlider={isShowingZoomSlider}
      />
      <Camera
        ref={cameraRef}
        style={styles.cameraWrapper}
        type={cameraType}
        flashMode={cameraFlashMode}
        autoFocus={Camera.Constants.AutoFocus.on}
        zoom={zoom}
      >
        <CameraComplexGestureHandler
          onPinch={onChangeZoom}
          onTap={() => setIsShowingZoomSlider(true)}
        />
      </Camera>
    </View>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraContainer);
