import React from 'react'
import {View, Pressable,StyleSheet, Text} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

type NavButtonsProps = {
  next: () => void;
  prev: () => void;
  pageNum: number;
  reset:()=>void;
  name:string;
}
export default function NavigationButtons({next ,prev, pageNum, name, reset}:NavButtonsProps){
  
  switch(pageNum){
    case 1: return(
        <View style={styles.container}>
          <Pressable style={styles.textButton}onPress={next}>
            <Ionicons name="chevron-forward" size={30} color="black" /> 
          </Pressable>
        </View>
      
    ) 
    case 2:return(
        <View style={styles.container}>
          <Pressable style={styles.textButton} onPress={prev}>
            <Ionicons name="chevron-back" size={30} color="black" />
          </Pressable>
          {
            name &&
          <Pressable style={styles.textButton}onPress={next}>
            <Ionicons name="chevron-forward" size={30} color="black" /> 
          </Pressable>
          }
        </View>
      
    )
    case 3:return(

        <View style={styles.container}>
          <Pressable style={styles.textButton}onPress={prev}>
            <Ionicons name="chevron-back" size={30} color="black" /> 
          </Pressable>
        </View>
      
    )
    case 4: return(
      <View style={styles.container}>
        <Pressable style={styles.textButton} 
          onPress={() =>{
            reset();
            next();
          }} >
          <Text>Press To Start</Text>
        </Pressable>
      </View>
    )
    default:{
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
  }
  
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    fontSize:20,
    marginVertical:50,
    justifyContent:"center",
    backgroundColor:"#D5BDAF",
    paddingHorizontal:20,
    gap:50,
  },
  textButton:{
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#EDEDE9",
    borderRadius:20,
    borderWidth:2,
    height:100,
    width:100,
    shadowColor: "#000",
  }
})