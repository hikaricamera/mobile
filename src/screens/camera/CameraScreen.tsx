// @flow
import React from 'react';

/* Components */
import { StyleSheet, SafeAreaView } from 'react-native';
import CameraTopBar from './CameraTopBar';
import CameraBottomBar from './CameraBottomBar';

/* Styles */
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column'
  },
});

const CameraScreen = () => (
  <SafeAreaView style={styles.wrapper}>
    <CameraTopBar />
    <CameraBottomBar />
  </SafeAreaView>
);

export default CameraScreen;
