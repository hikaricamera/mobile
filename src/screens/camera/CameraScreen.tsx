// @flow
import React from 'react';

/* Components */
import { StyleSheet, View } from 'react-native';
import CameraTopBar from './CameraTopBar';
import CameraBottomBar from './CameraBottomBar';

/* Styles */
const styles = StyleSheet.create({
  wrapper: {},
});

const CameraScreen = () => (
  <View style={styles.wrapper}>
    <CameraTopBar />
    <CameraBottomBar />
  </View>
);

export default CameraScreen;
