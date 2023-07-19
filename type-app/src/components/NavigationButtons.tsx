import React from 'react'
import {View, Button,StyleSheet} from 'react-native'

type NavButtonsProps = {
  next: () => void;
  prev: () => void;
}
export default function NavigationButtons({next ,prev}:NavButtonsProps){

  return(
    <View style={styles.container}>
      <View style={{backgroundColor:"#CBE7F6", padding:10, borderRadius:20}}>
       <Button title='Back' color={"black"} onPress={prev}/>
      </View>
      <View style={{backgroundColor:"#CBE7F6", padding:10, borderRadius:20}}>
        <Button title='Next' color={"black"} onPress={next}/>
      </View>
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
})