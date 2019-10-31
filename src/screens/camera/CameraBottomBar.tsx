import React from 'react';
import { connect } from 'react-redux';

/* Components */
import { StyleSheet, ImageBackground, View } from 'react-native';
import {
  IconButton,
  withTheme,
  Colors as PaperColors,
} from 'react-native-paper';
import ImageIcon from '../../assets/icons/image.png';
import FrameIcon from '../../assets/icons/frame.png';
import CameraButtonIcon from '../../assets/icons/camera_button.png';
import PaletteIcon from '../../assets/icons/palette.png';
import QueueIcon from '../../assets/icons/queue.png';
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
  leftWrapper: {
    height: 40,
    width: 120,
    marginRight: 36,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightWrapper: {
    height: 40,
    width: 120,
    marginLeft: 36,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const CameraBottomBar = ({ capturePhoto }: PropsType) => {
  return (
    <ImageBackground source={BottomBackgroundImage} style={styles.wrapper}>
      <View style={styles.leftWrapper}>
        <IconButton
          icon={ImageIcon}
          size={24}
          color={PaperColors.white}
          animated
        />
        <IconButton
          icon={FrameIcon}
          size={24}
          color={PaperColors.white}
          animated
        />
      </View>
      <IconButton
        icon={CameraButtonIcon}
        size={96}
        color={PaperColors.white}
        onPress={capturePhoto}
      />
      <View style={styles.rightWrapper}>
        <IconButton
          icon={PaletteIcon}
          size={24}
          color={PaperColors.white}
          animated
        />
        <IconButton
          icon={QueueIcon}
          size={24}
          color={PaperColors.white}
          animated
        />
      </View>
    </ImageBackground>
  );
};

export default withTheme(
  connect(
    null,
    mapDispatchToProps,
  )(CameraBottomBar),
);
