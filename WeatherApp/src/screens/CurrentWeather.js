import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import {Feather} from "@expo/vector-icons";

const CurrentWeather = () =>{

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style = {styles.container}>
      <Feather name="sun" size={100} color="black" />
        <Text style={styles.temp}>6</Text>
        <Text style={styles.feels}>Feels like 5</Text>
        <View style={styles.highLowWrapper}>
          <Text style={styles.highlow}>High: 8</Text>  
          <Text style={styles.highlow}>Low: 2</Text>  
        </View>
      </View>
        <View style={styles.bodyWrapper}>
          <Text style={styles.description}>Its sunny</Text>
          <Text style={styles.message}>Its perfect t-shirt weather</Text>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  wrapper:{
    flex:1,
    backgroundColor:"pink"
  },
  description:{
    fontSize:48,
  },
  message:{
    fontSize:40
  },
  bodyWrapper:{
    justifyContent:"flex-end",
    alignItems:"flex-start",
    fontSize: 34,
    padding:25,
    marginBottom:40,
  },
  temp:{
    color:"black",
    fontSize:48,
  },
  feels:{
    fontSize: 30,
    color:"black"
  },
  highlow:{
    color:"black",
    fontSize:20
  },
  highLowWrapper:{
    flexDirection:'row',
  },

  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  
})
export default CurrentWeather;

