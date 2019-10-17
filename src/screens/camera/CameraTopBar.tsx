import React from 'react';
import { connect } from 'react-redux';

/* Components */
import { StyleSheet, ImageBackground, View } from 'react-native';
import { IconButton, Colors as PaperColors } from 'react-native-paper';
import CartIcon from '../../assets/icons/cart.png';
import FlashIcon from '../../assets/icons/flash.png';
import LoopIcon from '../../assets/icons/loop.png';
import SettingsIcon from '../../assets/icons/settings.png';
import TopBackgroundImage from '../../assets/images/background_top.png';

/* Selectors */
import { getStatusBarHeight } from '../../reducers/UIControlReducer';

/* Constants */
const CAMERA_TOP_BAR_HEIGHT = 30;

/* Types */
declare interface ICameraTopBar {
  statusBarHeight: number;
}

declare interface IStyles {
  statusBarHeight: number;
}

/* Styles */
const styles = ({ statusBarHeight }: IStyles) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
      height: CAMERA_TOP_BAR_HEIGHT + statusBarHeight,
      position: 'absolute',
      top: 0,
      left: 0,
    },
    mainWrapper: {
      position: 'absolute',
      width: '100%',
      height: CAMERA_TOP_BAR_HEIGHT,
      top: statusBarHeight - 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });

const mapStateToProps = (state: any) => ({
  statusBarHeight: getStatusBarHeight(state),
});

const CameraTopBar = ({ statusBarHeight }: ICameraTopBar) => {
  const pStyles = styles({ statusBarHeight });

  return (
    <ImageBackground source={TopBackgroundImage} style={pStyles.wrapper}>
      <View style={pStyles.mainWrapper}>
        <IconButton
          icon={CartIcon}
          size={24}
          color={PaperColors.white}
          animated
        />
        <IconButton
          icon={FlashIcon}
          size={24}
          color={PaperColors.white}
          animated
        />
        <IconButton
          icon={LoopIcon}
          size={24}
          color={PaperColors.white}
          animated
        />
        <IconButton
          icon={SettingsIcon}
          size={24}
          color={PaperColors.white}
          animated
        />
      </View>
    </ImageBackground>
  );
};

export default connect(mapStateToProps)(CameraTopBar);
