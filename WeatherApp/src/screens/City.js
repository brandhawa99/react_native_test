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
        <IconText icon={"user"} msg={"8000"} />
        <View style={styles.populationWrapper}>
          <Feather name="user" size={50} color={"red"}/>
          <Text style={styles.populationText}>8,000</Text>
        </View>
         <View style={styles.riseSetWrapper}>
            <IconText icon={"sunrise"} msg={"18:18:18"} />
            <IconText icon={"sunset"} msg={"18:18:18"} />
          <View style={styles.sun}>
            <Feather name='sunrise' size={50} />
            <Text style={styles.time}>6:02:12 am</Text>
          </View>
          <View style={styles.sun}>
            <Feather name='sunset' size={50} color={"black"} />
            <Text style={styles.time}>17:18:19 pm</Text>
          </View>
        </View>
      </ImageBackground> 
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: StatusBar.currentHeight ||0

  },
  sun:{
    justifyContent:"center",
    alignItems:"center"
  },
  populationWrapper:{ 
    alignItems:"center"
  },
  riseSetWrapper:{
   alignItems:"center",
   flexDirection:"row",
   justifyContent:"space-around"
  },
  time:{
    fontSize:30,
    fontWeight:"500"
  },
  populationText:{
    fontSize:20
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