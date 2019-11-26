import React, { useRef } from 'react';

/* Components */
import { StyleSheet, View } from 'react-native';
import {
  PinchGestureHandler,
  ForceTouchGestureHandler,
} from 'react-native-gesture-handler';

declare interface PropsType {
  onPinch: (scale: number, velocity: number) => void;
  onTap: () => void;
}

/* Styles */
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});

const CameraComplexGestureHandler = ({ onPinch, onTap }: PropsType) => {
  // Refs
  const pinchGestureHandlerRef = useRef(null);
  const tapGestureHandlerRef = useRef(null);

  // Helpers
  const onPinchGestureEvent = ({ nativeEvent }: any) => {
    const { scale, velocity } = nativeEvent;
    onPinch(scale, velocity);
    onTap();
  };

  // Render
  return (
    <ForceTouchGestureHandler
      ref={tapGestureHandlerRef}
      simultaneousHandlers={pinchGestureHandlerRef}
      onGestureEvent={onTap}
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
