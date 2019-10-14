// @flow
import React from 'react';

/* Components */
import { StyleSheet, View } from 'react-native';
import CameraTopBar from './CameraTopBar';

/* Styles */
const styles = StyleSheet.create({
  wrapper: {},
});

const CameraScreen = () => (
  <View style={styles.wrapper}>
    <CameraTopBar />
  </View>
);

export default CameraScreen;
