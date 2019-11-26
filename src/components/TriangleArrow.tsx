import React from 'react';

/* Components */
import { StyleSheet, View } from 'react-native';

export const TRIANGLE_TYPES = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
};

declare interface PropsType {
  type: number;
  width?: number;
  height?: number;
  rotation?: number;
  color?: string;
}

const styles = StyleSheet.create({
  baseStyle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

const TriangleArrow = ({
  type,
  rotation,
  color = '#fff',
  width = 16,
  height = 8,
}: PropsType) => {
  if (rotation === undefined || rotation === null) {
    switch (type) {
      case TRIANGLE_TYPES.UP:
        rotation = 0;
        break;
      case TRIANGLE_TYPES.DOWN:
        rotation = 180;
        break;
      case TRIANGLE_TYPES.LEFT:
        rotation = -90;
        break;
      case TRIANGLE_TYPES.RIGHT:
        rotation = 90;
        break;
      default:
        break;
    }
  }

  return (
    <View
      style={[
        styles.baseStyle,
        { borderBottomColor: color },
        {
          transform: [{ rotate: `${rotation}deg` }],
        },
        {
          borderLeftWidth: width / 2,
          borderRightWidth: width / 2,
          borderBottomWidth: height,
        },
      ]}
    />
  );
};

export default TriangleArrow;
