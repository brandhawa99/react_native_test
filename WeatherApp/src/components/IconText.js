import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Feather } from '@expo/vector-icons';

const IconText = (props) => {
  const {msg, icon, size, color} = props

  return (
    <View style={styles.container}>
      <Feather name={icon || "smile"} size={size} color={color || "black"} />
      <Text style={styles.txt}>{msg}</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container:{
    alignItems:"center"
  },
  txt:{
    fontSize:25,
    fontWeight:"500"
  }
})

export default IconText
