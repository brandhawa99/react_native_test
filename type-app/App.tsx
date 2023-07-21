import {useKeepAwake} from 'expo-keep-awake'
import React from 'react';
import Tabs from './src/components/Tabs'

export default function App() {
  useKeepAwake();


  return (
    <Tabs />
  );
}


