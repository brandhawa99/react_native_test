import React from 'react'
import {View, Pressable,StyleSheet, Text} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

type NavButtonsProps = {
  next: () => void;
  prev: () => void;
}
export default function NavigationButtons({next ,prev}:NavButtonsProps){

  return(
    <View style={styles.container}>
      <Pressable style={styles.textButton} onPress={prev}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </Pressable>
      
      <Pressable style={styles.textButton}onPress={next}>
        <Ionicons name="chevron-forward" size={30} color="black" /> 
      </Pressable>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    fontSize:20,
    marginVertical:50,
    justifyContent:"space-between",
    backgroundColor:"#D5BDAF",
    paddingHorizontal:20,
  },
  textButton:{
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#EDEDE9",
    borderRadius:100,
    height:100,
    width:100,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,

  }
})