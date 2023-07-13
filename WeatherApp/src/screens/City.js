import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView,StyleSheet,View, Text, ImageBackground} from 'react-native';
import { Feather } from '@expo/vector-icons';
import IconText from '../components/IconText';

const City = () =>{

  return(
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/van.jpg')} style={styles.imageLayout}>
        <Text style={[styles.cityName, styles.cityText]}>Vancouver</Text>
        <Text style={[styles.cityText,styles.countryName]} >CA</Text>
        <IconText icon={"user"} msg={"8000"} size={50} color={"red"} />
         <View style={styles.riseSetWrapper}>
            <IconText icon={"sunrise"} msg={"18:18:18"} size={50} />
            <IconText icon={"sunset"} msg={"18:18:18"} size={50} />
        </View>
      </ImageBackground> 
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: StatusBar.currentHeight ||0,
    backgroundColor:"lightblue"

  },
  riseSetWrapper:{
   alignItems:"center",
   flexDirection:"row",
   justifyContent:"space-around",
   backgroundColor:"orange",
   paddingVertical:10
  },
  imageLayout:{
    flex:1,
  },
  cityText:{
    justifyContent:'center',
    alignSelf:"center",
    fontWeight:"bold",
    color:"white",
    
  },
  cityName:{
    fontSize: 40,
  },
  countryName:{
    fontSize:30,
  }
})
export default City