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
import { Camera } from 'expo-camera';

/* Actions */
import { changeCameraType } from '../../actions/CameraAction';

/* Selectors */
import { getStatusBarHeight } from '../../reducers/UIControlReducer';
import { getCameraType } from '../../reducers/CameraReducer';
import { CameraType } from '../../typings/CameraConstantType';

/* Constants */
const CAMERA_TOP_BAR_HEIGHT = 30;

/* Types */
import { Dispatch } from 'redux';

declare interface PropsType {
  cameraType: CameraType;
  statusBarHeight: number;
  alterCameraType: (cameraType: CameraType) => void;
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
});

const CameraTopBar = ({
  statusBarHeight,
  cameraType,
  alterCameraType,
}: PropsType) => {
  // Helpers
  const onClickLoopIcon = () => {
    alterCameraType(cameraType);
  };

  // Render
  const pStyles = styles({ statusBarHeight });
  return (
    <ImageBackground source={TopBackgroundImage} style={pStyles.wrapper}>
      <View style={pStyles.mainWrapper}>
        <IconButton icon={CartIcon} size={24} color={PaperColors.white} />
        <IconButton icon={FlashIcon} size={24} color={PaperColors.white} />
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
