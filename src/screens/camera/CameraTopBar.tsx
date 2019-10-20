import React from 'react';
import { connect } from 'react-redux';

/* Components */
import { StyleSheet, ImageBackground, View } from 'react-native';
import { IconButton, Colors as PaperColors } from 'react-native-paper';
import { Camera } from 'expo-camera';
import CartIcon from '../../assets/icons/cart.png';
import LoopIcon from '../../assets/icons/loop.png';
import SettingsIcon from '../../assets/icons/settings.png';
import TopBackgroundImage from '../../assets/images/background_top.png';
import FlashOnIcon from '../../assets/icons/flash_on.png';
import FlashOffIcon from '../../assets/icons/flash_off.png';
import FlashAutoIcon from '../../assets/icons/flash_auto.png';
import FlashTorchIcon from '../../assets/icons/flash_torch.png';

/* Actions */
import {
  changeCameraType,
  changeCameraFlashMode,
} from '../../actions/CameraAction';

/* Selectors */
import { getStatusBarHeight } from '../../reducers/UIControlReducer';
import {
  getCameraType,
  getCameraFlashMode,
} from '../../reducers/CameraReducer';

/* Constants */
const CAMERA_TOP_BAR_HEIGHT = 30;

/* Types */
import { Dispatch } from 'redux';
import {
  CameraTypeType,
  CameraFlashModeType,
} from '../../typings/CameraConstantType';

declare interface PropsType {
  cameraType: CameraTypeType;
  cameraFlashMode: CameraFlashModeType;
  statusBarHeight: number;
  alterCameraType: (cameraType: CameraTypeType) => void;
  alterCameraFlashMode: (cameraFlashMode: CameraFlashModeType) => void;
}

declare interface StylesType {
  statusBarHeight: number;
}

/* Styles */
const styles = ({ statusBarHeight }: StylesType) =>
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
  cameraType: getCameraType(state),
  cameraFlashMode: getCameraFlashMode(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  alterCameraType: (cameraType: any) =>
    dispatch(
      changeCameraType(
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
      ),
    ),
  alterCameraFlashMode: (cameraFlashMode: any) =>
    dispatch(changeCameraFlashMode(cameraFlashMode)),
});

const CameraTopBar = ({
  statusBarHeight,
  cameraType,
  cameraFlashMode,
  alterCameraType,
  alterCameraFlashMode,
}: PropsType) => {
  // Helpers
  const onClickLoopIcon = () => {
    alterCameraType(cameraType);
  };

  const onClickFlashIcon = () => {
    switch (cameraFlashMode) {
      case Camera.Constants.FlashMode.auto:
        alterCameraFlashMode(Camera.Constants.FlashMode.on);
        break;
      case Camera.Constants.FlashMode.on:
        alterCameraFlashMode(Camera.Constants.FlashMode.torch);
        break;
      case Camera.Constants.FlashMode.torch:
        alterCameraFlashMode(Camera.Constants.FlashMode.off);
        break;
      case Camera.Constants.FlashMode.off:
        alterCameraFlashMode(Camera.Constants.FlashMode.auto);
        break;
      default:
        break;
    }
  };

  const getFlashModeIcon = () => {
    switch (cameraFlashMode) {
      case Camera.Constants.FlashMode.auto:
        return FlashAutoIcon;
      case Camera.Constants.FlashMode.on:
        return FlashOnIcon;
      case Camera.Constants.FlashMode.torch:
        return FlashTorchIcon;
      case Camera.Constants.FlashMode.off:
        return FlashOffIcon;
      default:
        return null;
    }
  };

  // Render
  const pStyles = styles({ statusBarHeight });
  return (
    <ImageBackground source={TopBackgroundImage} style={pStyles.wrapper}>
      <View style={pStyles.mainWrapper}>
        <IconButton icon={CartIcon} size={24} color={PaperColors.white} />
        <IconButton
          icon={getFlashModeIcon()}
          size={24}
          color={PaperColors.white}
          onPress={onClickFlashIcon}
        />
        <IconButton
          icon={LoopIcon}
          size={24}
          color={PaperColors.white}
          onPress={onClickLoopIcon}
        />
        <IconButton icon={SettingsIcon} size={24} color={PaperColors.white} />
      </View>
    </ImageBackground>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraTopBar);
