import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';


const NameInputs = ({setAudioFileName}:any) =>{
  return(
    <View style={styles.container}>
      <TextInput 
        style={styles.text}
        autoCorrect={false}
        spellCheck={false}
        placeholder='Name...'
        autoCapitalize="words"
        onChangeText={newText => setAudioFileName(newText)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:"center",
  },
  text:{
    fontSize:23,
    backgroundColor:"#E3D5CA",
    color:'black',
    width:250,
    paddingHorizontal:10,
    paddingVertical:8,
    textAlign:"center",
    borderRadius:15,
    borderWidth: 2,
  }
}) 


export default NameInputs