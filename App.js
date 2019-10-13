// @flow
import { AppLoading } from 'expo';
import React, { useState } from 'react';
import { Provider } from 'react-redux';

/* Store */
import store from './Store';

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

  return <Provider store={store} />;
};

export default App;
