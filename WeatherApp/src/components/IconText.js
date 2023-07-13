import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Feather } from '@expo/vector-icons';

const IconText = (props) => {
  const {msg, icon, size, color} = props

  return (
    <View>
      <Feather name={icon || "smile"} size={size} color={color || "black"} />
      <Text>{msg}</Text>
    </View>
  )

}

export default IconText
