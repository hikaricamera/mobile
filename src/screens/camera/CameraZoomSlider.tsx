import React, { useRef, useEffect, useState } from 'react';

/* Components */
import { StyleSheet, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

/* Constants */
import {
  CAMERA_SLIDER_HEIGHT,
  CAMERA_SLIDER_CIRCLE_VELOCITY_ATTENUATION,
  CAMERA_MIN_ZOOM,
  CAMERA_MAX_ZOOM,
} from '../../constants/CameraConstants';

/* Types */
declare interface PropsType {
  isShowingZoomSlider: boolean;
  onShowZoomSlider: () => void;
  onHideZoomSlider: () => void;
  onDragZoomSlider: (newZoom: number) => void;
  zoom: number;
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 1,
    position: 'absolute',
    top: 160,
    right: 16,
    width: 1,
    height: CAMERA_SLIDER_HEIGHT,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
});

const CameraZoomSlider = ({
  isShowingZoomSlider,
  onShowZoomSlider,
  onHideZoomSlider,
  onDragZoomSlider,
  zoom,
}: PropsType) => {
  // Refs
  const barOpacity = useRef<any>(new Animated.Value(0)).current;
  const circleOpacity = useRef<any>(new Animated.Value(0)).current;

  // States
  const [circleY, setCircleY] = useState<number>(0);
  const [barShowingTimeoutHandler, setBarShowingTimeoutHandler] = useState<any>(
    null,
  );

  // Helpers
  const createShowingTimeoutHandler = () => {
    // This component would disappear if user hasn't interacted with it for some time
    clearTimeout(barShowingTimeoutHandler);
    const handler = setTimeout(() => {
      onHideZoomSlider();
    }, 2000);
    setBarShowingTimeoutHandler(handler);
  };

  // Listeners
  const onPanGestureEvent = ({ nativeEvent }: any) => {
    const { velocityY } = nativeEvent;

    // Update circle animation
    const newCircleY = Math.max(
      0,
      Math.min(
        CAMERA_SLIDER_HEIGHT,
        circleY + velocityY / CAMERA_SLIDER_CIRCLE_VELOCITY_ATTENUATION,
      ),
    );
    setCircleY(newCircleY);

    // Call back update zoom value
    const newZoom =
      CAMERA_MIN_ZOOM +
      (CAMERA_MAX_ZOOM - CAMERA_MIN_ZOOM) * (newCircleY / CAMERA_SLIDER_HEIGHT);
    onDragZoomSlider(newZoom);

    // Keep showing zoom slider
    onShowZoomSlider();
  };

  // Effects
  useEffect(() => {
    // On showing or hiding zoom slider
    if (isShowingZoomSlider) {
      Animated.timing(barOpacity, {
        toValue: 0.8,
        duration: 200,
      }).start();
      Animated.timing(circleOpacity, {
        toValue: 1,
        duration: 300,
      }).start();
      createShowingTimeoutHandler();
    } else {
      Animated.timing(barOpacity, {
        toValue: 0,
        duration: 200,
      }).start();
      Animated.timing(circleOpacity, {
        toValue: 0,
        duration: 300,
      });
    }
  }, [isShowingZoomSlider]);

  useEffect(() => {
    setCircleY(
      (CAMERA_SLIDER_HEIGHT * (zoom - CAMERA_MIN_ZOOM)) /
        (CAMERA_MAX_ZOOM - CAMERA_MIN_ZOOM),
    );
  }, [zoom]);

  // Render
  return (
    <Animated.View style={[styles.wrapper, { opacity: barOpacity }]}>
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <Animated.View
          style={[
            styles.circle,
            { marginTop: circleY, opacity: circleOpacity },
          ]}
        />
      </PanGestureHandler>
    </Animated.View>
  );
};

export default CameraZoomSlider;
