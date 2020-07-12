import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from './src/store';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

const { store, persistor } = createStore;

const WrappedRoot = ({ element }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Fragment>
          <CssBaseline />
          <Header>{element}</Header>
          <Footer />
        </Fragment>
      </PersistGate>
    </Provider>
  );
};

export { WrappedRoot };
