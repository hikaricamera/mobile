import React from 'react';
import { connect } from 'react-redux';

/* Components */
import { StyleSheet, ImageBackground } from 'react-native';
import {
  IconButton,
  withTheme,
  Colors as PaperColors,
} from 'react-native-paper';
import ImageIcon from '../../assets/icons/image.png';
import WheelIcon from '../../assets/icons/color_wheel.png';
import CameraButtonIcon from '../../assets/icons/camera_button.png';
import PaletteIcon from '../../assets/icons/palette.png';
import SliderIcon from '../../assets/icons/slider.png';
import BottomBackgroundImage from '../../assets/images/background_bottom.png';

/* Actions */
import { changeCapturingState } from '../../actions/CameraAction';

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
    width: '100%',
    height: 168,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const CameraBottomBar = ({ capturePhoto }: PropsType) => {
  return (
    <ImageBackground source={BottomBackgroundImage} style={styles.wrapper}>
      <IconButton
        icon={ImageIcon}
        size={24}
        color={PaperColors.white}
        animated
      />
      <IconButton
        icon={WheelIcon}
        size={24}
        color={PaperColors.white}
        animated
      />
      <IconButton
        icon={CameraButtonIcon}
        size={96}
        color={PaperColors.white}
        onPress={capturePhoto}
      />
      <IconButton
        icon={PaletteIcon}
        size={24}
        color={PaperColors.white}
        animated
      />
      <IconButton
        icon={SliderIcon}
        size={24}
        color={PaperColors.white}
        animated
      />
    </ImageBackground>
  );
};

export default withTheme(
  connect(
    null,
    mapDispatchToProps,
  )(CameraBottomBar),
);
