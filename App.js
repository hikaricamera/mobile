// @flow
import { AppLoading } from 'expo';
import React, { useState } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

/* Theme */
import theme from './constants/theme/Theme';

/* Store */
import store from './Store';

/* Navigator */
import MainNavigator from './navigation/MainNavigator';

const loadResourcesAsync = async () => {};

const handleLoadingError = () => {};

const handleFinishLoading = (setLoadingComplete) => {
  setLoadingComplete(true);
};

const App = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <MainNavigator />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
