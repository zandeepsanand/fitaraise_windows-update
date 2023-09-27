import 'react-native-gesture-handler';

import React from 'react';

import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';
import {LoginProvider} from './src/hooks/LoginContext';

export default function App() {
  return (
    <LoginProvider>
      <DataProvider>
        <AppNavigation />
      </DataProvider>
    </LoginProvider>
  );
}
