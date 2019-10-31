import React, { useRef } from 'react';

/* Components */
import { StyleSheet, View } from 'react-native';
import {
  PinchGestureHandler,
  ForceTouchGestureHandler,
} from 'react-native-gesture-handler';

declare interface PropsType {
  onChangeZoom: (scale: number, velocity: number) => void;
  onShowZoomSlider: () => void;
}

/* Styles */
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});

const CameraComplexGestureHandler = ({
  onChangeZoom,
  onShowZoomSlider,
}: PropsType) => {
  // Refs
  const pinchGestureHandlerRef = useRef(null);
  const tapGestureHandlerRef = useRef(null);

  // Helpers
  const onTapGestureEvent = () => {
    onShowZoomSlider();
  };

  const onPinchGestureEvent = ({ nativeEvent }: any) => {
    const { scale, velocity } = nativeEvent;
    onChangeZoom(scale, velocity);
    onShowZoomSlider();
  };

  // Render
  return (
    <ForceTouchGestureHandler
      ref={tapGestureHandlerRef}
      simultaneousHandlers={pinchGestureHandlerRef}
      onGestureEvent={onTapGestureEvent}
      minForce={0}
    >
      <View style={styles.wrapper}>
        <PinchGestureHandler
          ref={pinchGestureHandlerRef}
          simultaneousHandlers={tapGestureHandlerRef}
          onGestureEvent={onPinchGestureEvent}
        >
          <View style={styles.wrapper} />
        </PinchGestureHandler>
      </View>
    </ForceTouchGestureHandler>
  );
};

export default CameraComplexGestureHandler;
