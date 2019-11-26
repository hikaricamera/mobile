import React, { useRef, useEffect, useState } from 'react';

/* Components */
import { StyleSheet, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

/* Types */
declare interface PropsType {
  width?: number;
  height: number;
  isShowing: boolean;
  velocityAttenuation?: number;
  onHideSlideBar?: () => void;
  onShowSlideBar?: () => void;
  onDragSlideBar?: (scale: number) => void;
  overrideScale?: number;
  overrideWrapperStyle?: object;
  overrideCircleStyle?: object;
}

const styles = StyleSheet.create({
  wrapper: {
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
  width = 1,
  height,
  isShowing,
  velocityAttenuation = 100,
  onHideSlideBar = () => {},
  onShowSlideBar = () => {},
  onDragSlideBar = () => {},
  overrideScale,
  overrideWrapperStyle,
  overrideCircleStyle,
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
      onHideSlideBar();
    }, 2000);
    setBarShowingTimeoutHandler(handler);
  };

  // Listeners
  const onPanGestureEvent = ({ nativeEvent }: any) => {
    const { velocityY } = nativeEvent;

    // Update circle animation
    const newCircleY = Math.max(
      0,
      Math.min(height, circleY + velocityY / velocityAttenuation),
    );
    setCircleY(newCircleY);

    onDragSlideBar(newCircleY / height);
    onShowSlideBar();
  };

  // Effects
  useEffect(() => {
    if (isShowing) {
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
  }, [isShowing]);

  useEffect(() => {
    if (overrideScale !== undefined && overrideScale !== null) {
      setCircleY(overrideScale * height);
    }
  }, [overrideScale]);

  // Render
  return (
    <Animated.View
      style={[
        styles.wrapper,
        overrideWrapperStyle,
        { opacity: barOpacity, width, height },
      ]}
    >
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <Animated.View
          style={[
            styles.circle,
            overrideCircleStyle,
            { marginTop: circleY, opacity: circleOpacity },
          ]}
        />
      </PanGestureHandler>
    </Animated.View>
  );
};

export default CameraZoomSlider;
