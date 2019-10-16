// @flow
import React from 'react';

/* Components */
import { StatusBar, StyleSheet, View, ImageBackground } from 'react-native';
import { IconButton, withTheme } from 'react-native-paper';
import CartIcon from '../../assets/icons/cart.png';
import FlashIcon from '../../assets/icons/flash.png';
import LoopIcon from '../../assets/icons/loop.png';
import SettingsIcon from '../../assets/icons/settings.png';
import TopBackgroundImage from '../../assets/images/background_top.png';
import CommonColorsMixin from '../../constants/theme/Colors';

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
    <View>
      <ImageBackground source={TopBackgroundImage} style={styles.wrapper}>
        <StatusBar hidden />
        <IconButton icon={CartIcon} size={24} color={CommonColorsMixin.white} animated />
        <IconButton icon={FlashIcon} size={24} color={CommonColorsMixin.white} animated />
        <IconButton icon={LoopIcon} size={24} color={CommonColorsMixin.white} animated />
        <IconButton icon={SettingsIcon} size={24} color={CommonColorsMixin.white} animated />
      </ImageBackground>
    </View>
  );
};

export default withTheme(CameraTopBar);
