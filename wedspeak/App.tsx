import {useKeepAwake} from 'expo-keep-awake'
import React,{useCallback} from 'react';
import Tabs from './src/components/Tabs'
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

import {useFonts} from 'expo-font';

export default function App() {
  useKeepAwake();

  const [fontsLoaded] = useFonts({
    'GreatVibes': require("./assets/fonts/GreatVibes-Regular.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  }


  return (
    <Tabs />
  );
}


