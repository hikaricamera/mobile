import React from 'react';

/* Components */
import { StyleSheet, ImageBackground } from 'react-native';
import {
  withTheme,
  IconButton,
  Colors as PaperColors,
} from 'react-native-paper';
import CartIcon from '../../assets/icons/cart.png';
import FlashIcon from '../../assets/icons/flash.png';
import LoopIcon from '../../assets/icons/loop.png';
import SettingsIcon from '../../assets/icons/settings.png';
import TopBackgroundImage from '../../assets/images/background_top.png';

/* Types */

/* Styles */
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const CameraTopBar = () => {
  return (
    <ImageBackground source={TopBackgroundImage} style={styles.wrapper}>
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
    </ImageBackground>
  );
};

export default withTheme(CameraTopBar);
