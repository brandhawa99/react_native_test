import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

type IconButtonType = {
  children: JSX.Element;
  onPress: () => void;
}

const IconButton = (props:IconButtonType) =>{

  return(
    <Pressable
      style={styles.container}
      onPress={props.onPress}
    >
      {
        props.children
      }
    </Pressable>
  )
} 

const styles = StyleSheet.create({
  container:{
    width: 100,
    height:100,
    backgroundColor:"#F5EBE0",
    borderRadius:100,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:10,
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

export default IconButton