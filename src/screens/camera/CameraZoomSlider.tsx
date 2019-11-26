import React from 'react';

/* Components */
import { StyleSheet } from 'react-native';
import HikariSlideBar from '../../components/HikariSlideBar';

/* Constants */
import {
  CAMERA_SLIDER_HEIGHT,
  CAMERA_SLIDER_CIRCLE_VELOCITY_ATTENUATION,
  CAMERA_MIN_ZOOM,
  CAMERA_MAX_ZOOM,
} from '../../constants/CameraConstants';

declare interface PropsType {
  zoom: number;
  setZoom: (zoom: number) => void;
  setIsShowingZoomSlider: (isShowing: boolean) => void;
  isShowingZoomSlider: boolean;
}

const styles = StyleSheet.create({
  overrideWrapper: {
    zIndex: 1,
    position: 'absolute',
    top: 160,
    right: 16,
  },
});

const CameraZoomSlider = ({
  zoom,
  setZoom,
  setIsShowingZoomSlider,
  isShowingZoomSlider,
}: PropsType) => {
  // Listeners
  const onSetNewZoom = (scale: number) => {
    const newZoom = scale * (CAMERA_MAX_ZOOM - CAMERA_MIN_ZOOM);
    setZoom(newZoom);
  };

  // Render
  return (
    <HikariSlideBar
      height={CAMERA_SLIDER_HEIGHT}
      isShowing={isShowingZoomSlider}
      velocityAttenuation={CAMERA_SLIDER_CIRCLE_VELOCITY_ATTENUATION}
      onShowSlideBar={() => setIsShowingZoomSlider(true)}
      onHideSlideBar={() => setIsShowingZoomSlider(false)}
      onDragSlideBar={onSetNewZoom}
      overrideScale={zoom / (CAMERA_MAX_ZOOM - CAMERA_MIN_ZOOM)}
      overrideWrapperStyle={styles.overrideWrapper}
    />
  );
};

export default CameraZoomSlider;
