import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Components */
import { StatusBar, AsyncStorage } from 'react-native';

/* Actions */
import { setStatusBarHeight } from '../actions/UIControlAction';

/* Selectors */
import { getStatusBarHeight } from '../reducers/UIControlReducer';

/* Constants */
import Constants from 'expo-constants';

/* Types */
import { FullStatesType } from '../typings/DataType';
import { Dispatch } from 'redux';

declare interface PropsType {
  reportStatusBarHeight: (height: number) => void;
  statusBarHeight: number;
}

const mapStateToProps = (state: FullStatesType) => ({
  statusBarHeight: getStatusBarHeight(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  reportStatusBarHeight: (height: number) =>
    dispatch(setStatusBarHeight(height)),
});

const HikariStatusBar = ({
  reportStatusBarHeight,
  statusBarHeight,
}: PropsType) => {
  // States
  const [hideStatusBar, setHideStatusBar] = useState(false);

  // Effects
  useEffect(() => {
    // A hacky way to get the correct status bar height.
    // The native can only compute the correct status bar height when
    // it is shown. Hence the status bar is first visible then hidden.
    const getStatusBarHeight = async () => {
      const cachedStatusBarHeight = await AsyncStorage.getItem(
        '_status_bar_height',
      );
      if (cachedStatusBarHeight !== null) {
        const cachedStatusBarHeightInt = parseInt(cachedStatusBarHeight);
        if (cachedStatusBarHeightInt > 0) {
          reportStatusBarHeight(cachedStatusBarHeightInt);
          return;
        }
      }
      if (!hideStatusBar && Constants.statusBarHeight > 0) {
        reportStatusBarHeight(Constants.statusBarHeight);
        AsyncStorage.setItem(
          '_status_bar_height',
          `${Constants.statusBarHeight}`,
        );
      }
    };
    getStatusBarHeight();
  }, [hideStatusBar]);

  useEffect(() => {
    if (statusBarHeight > 0) {
      setHideStatusBar(true);
    } else {
      setHideStatusBar(false);
    }
  }, [statusBarHeight]);

  return <StatusBar hidden={hideStatusBar} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HikariStatusBar);
