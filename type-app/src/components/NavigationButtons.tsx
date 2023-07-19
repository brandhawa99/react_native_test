import React from 'react'
import {View, Pressable,StyleSheet, Text} from 'react-native'

type NavButtonsProps = {
  next: () => void;
  prev: () => void;
}
export default function NavigationButtons({next ,prev}:NavButtonsProps){

  return(
    <View style={styles.container}>
       <Pressable style={styles.textButton} onPress={prev}>
        <Text style={{fontSize:25}}>Back</Text>
      </Pressable>
      
        <Pressable style={styles.textButton}onPress={next}>
          <Text style={{fontSize:25}}>Next</Text>
        </Pressable>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"center",
    gap:30,
    fontSize:20,
    marginVertical:50,
  },
  textButton:{
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#CBE7F6",
    padding:20,
    minWidth:100,
    borderRadius:20,

  }
})