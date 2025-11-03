import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation';
import { useStore } from './src/state/store';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const hydrate = useStore(s => s.hydrate);
  useEffect(() => { hydrate(); }, [hydrate]);
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <RootNavigator />
    </NavigationContainer>
  );
}
