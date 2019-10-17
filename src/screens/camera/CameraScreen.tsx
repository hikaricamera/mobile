import React from 'react';

/* Components */
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import CameraTopBar from './CameraTopBar';
import CameraBottomBar from './CameraBottomBar';

/* Styles */
const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const CameraScreen = () => (
  <SafeAreaView style={styles.wrapper}>
    <StatusBar hidden />
    <CameraTopBar />
    <CameraBottomBar />
  </SafeAreaView>
);

export default CameraScreen;
