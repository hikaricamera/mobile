import React from 'react';

/* Components */
import { StyleSheet, View } from 'react-native';
import CameraTopBar from './CameraTopBar';
import CameraBottomBar from './CameraBottomBar';
import CameraContainer from './CameraContainer';
import HikariStatusBar from '../../components/HikariStatusBar';

/* Styles */
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  upperWrapper: {
    flex: 1,
  },
});

const CameraScreen = () => (
  <View style={styles.wrapper}>
    <HikariStatusBar />
    <View style={styles.upperWrapper}>
      <CameraContainer />
      <CameraTopBar />
    </View>
    <CameraBottomBar />
  </View>
);

export default CameraScreen;
