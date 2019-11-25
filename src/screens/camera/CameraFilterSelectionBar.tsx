import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

/* Components */
import * as Haptics from 'expo-haptics';
import BackgroundImage from '../../assets/images/background_top.png';
import { StyleSheet, ImageBackground, View, FlatList } from 'react-native';
import { withTheme } from 'react-native-paper';
import TriangleArrow, { TRIANGLE_TYPES } from '../../components/TriangleArrow';

/* Constants */
import {
  CAMERA_BOTTOM_BAR_HEIGHT,
  CAMERA_FILTER_SELECTION_FILTER_TILE_WIDTH,
  CAMERA_FILTER_SELECTION_FILTER_TILE_SELECTED_WIDTH,
  CAMERA_FILTER_SELECTION_FILTER_TILE_PADDING,
} from '../../constants/CameraConstants';
import { SCREEN_WIDTH } from '../../constants/ScreenConstants';

/* Types */
import { Dispatch } from 'redux';

declare interface PropsType {}

const mapDispatchToProps = (dispatch: Dispatch) => ({});

/* Styles */
const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 8,
    position: 'absolute',
    left: 0,
    bottom: CAMERA_BOTTOM_BAR_HEIGHT,
    width: '100%',
    height: 92,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  flatListContent: {
    alignItems: 'center',
    paddingLeft: SCREEN_WIDTH / 2 - 42,
    paddingRight: SCREEN_WIDTH / 2,
  },
  filterTile: {
    marginLeft: CAMERA_FILTER_SELECTION_FILTER_TILE_PADDING,
    width: CAMERA_FILTER_SELECTION_FILTER_TILE_WIDTH,
    height: CAMERA_FILTER_SELECTION_FILTER_TILE_WIDTH,
    backgroundColor: 'white',
  },
  filterTileSelected: {
    marginLeft: CAMERA_FILTER_SELECTION_FILTER_TILE_PADDING,
    width: CAMERA_FILTER_SELECTION_FILTER_TILE_SELECTED_WIDTH,
    height: CAMERA_FILTER_SELECTION_FILTER_TILE_SELECTED_WIDTH,
    backgroundColor: '#ff0',
  },
});

const CameraBottomBar = ({}: PropsType) => {
  // TODO: move to other components
  const traditionalFilters: any = [
    { key: '10' },
    { key: '9' },
    { key: '8' },
    { key: '7' },
    { key: '6' },
    { key: '4' },
    { key: '3' },
    { key: '2' },
    { key: '1' },
    { key: '0' },
  ];

  const neuralFilters: any = [];

  const allFilters = traditionalFilters.concat(neuralFilters);

  // Refs
  const flatListRef = useRef(null);
  // States
  // TODO: calculate the initial filter
  // 1. If users choose before, read from the async storage
  // 2. Otherwise, use the screen width to initialize
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  // Listeners
  const onFlatListScroll = ({ nativeEvent }: any) => {
    const { contentOffset } = nativeEvent;
    const { x: offsetX } = contentOffset;

    const currentSelectedIndex = Math.floor(
      offsetX /
        (CAMERA_FILTER_SELECTION_FILTER_TILE_WIDTH +
          CAMERA_FILTER_SELECTION_FILTER_TILE_PADDING),
    );
    if (
      currentSelectedIndex >= 0 &&
      currentSelectedIndex < traditionalFilters.length + neuralFilters.length &&
      selectedFilterIndex !== currentSelectedIndex
    ) {
      Haptics.selectionAsync();
      setSelectedFilterIndex(currentSelectedIndex);
    }
  };

  const onFlatListEndDrag = () => {
    if (selectedFilterIndex < 0) {
      return;
    }
    if (flatListRef && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: selectedFilterIndex,
        viewPosition: 0.48,
      });
    }
  };

  // Render
  const renderFilterTile = ({ item, index }: any) => (
    <View
      key={item}
      style={
        index === selectedFilterIndex
          ? styles.filterTileSelected
          : styles.filterTile
      }
    />
  );

  return (
    <ImageBackground source={BackgroundImage} style={styles.wrapper}>
      <View style={{ alignSelf: 'center' }}>
        <TriangleArrow type={TRIANGLE_TYPES.DOWN} />
      </View>
      <FlatList
        ref={flatListRef}
        data={allFilters}
        renderItem={renderFilterTile}
        onScroll={onFlatListScroll}
        onScrollEndDrag={onFlatListEndDrag}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.flatListContent}
      />
    </ImageBackground>
  );
};

export default withTheme(connect(null, mapDispatchToProps)(CameraBottomBar));
