import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type RecordButtonsProps = {
  text:string,
  children?:JSX.Element,
  press: ()=> void,
  buttonColor?:string

}
const RecordButtons = ({text, press, buttonColor, children}:RecordButtonsProps) =>{

  return(
    <Pressable style={[styles.container,{backgroundColor:buttonColor||"beige"}]} onPress={press}>
      {children}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:"center",
    marginHorizontal:10,
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:15,
    borderWidth:2,
  },
  text:{
    fontSize:21,
    fontWeight:"400",
    fontFamily:"GreatVibes"
  }
})

export default RecordButtons