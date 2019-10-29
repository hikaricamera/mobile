import React from 'react';

/* Components */
import { StyleSheet, View } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';

/* Types */
declare interface PropsType {
  onChangeZoom: (scale: number, velocity: number) => void;
}

/* Styles */
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});

const CameraPinchBox = ({ onChangeZoom }: PropsType) => {
  // Helpers
  const onGestureEvent = ({ nativeEvent }: any) => {
    const { scale, velocity } = nativeEvent;
    onChangeZoom(scale, velocity);
  };

  // Render
  return (
    <PinchGestureHandler onGestureEvent={onGestureEvent}>
      <View style={styles.wrapper}></View>
    </PinchGestureHandler>
  );
};

export default CameraPinchBox;
