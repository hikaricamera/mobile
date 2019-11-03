import React from 'react';
import { connect } from 'react-redux';

/* Components */
import { StyleSheet, ImageBackground, View } from 'react-native';
import {
  IconButton,
  withTheme,
  Colors as PaperColors,
} from 'react-native-paper';

import BackgroundImage from '../../assets/images/background_top.png';

/* Actions */
import { changeCapturingState } from '../../actions/CameraAction';

/* Constants */
import { CAMERA_BOTTOM_BAR_HEIGHT } from '../../constants/CameraConstants';

/* Types */
import { Dispatch } from 'redux';

declare interface PropsType {
  capturePhoto: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  capturePhoto: () => dispatch(changeCapturingState(true)),
});

/* Styles */
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    bottom: CAMERA_BOTTOM_BAR_HEIGHT,
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const CameraBottomBar = ({ capturePhoto }: PropsType) => {
  return (
    <ImageBackground
      source={BackgroundImage}
      style={styles.wrapper}
    ></ImageBackground>
  );
};

export default withTheme(
  connect(
    null,
    mapDispatchToProps,
  )(CameraBottomBar),
);
