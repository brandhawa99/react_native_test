import React, { useState } from 'react';
import {Button, View, Text, TextInput, StyleSheet} from 'react-native'

const Lock = (props:any) =>{
  const {setAuth} = props;
  const [passCheck , setPassCheck] = useState<String>();
  const pass: String = "2015"
  const checkPass =() =>{
    if(passCheck == pass){
      setAuth(true); 
    }else{
      setAuth(false);  
    }
  }


  return(
    <View style={styles.container}>
      <Text>
        Locked enter password
      </Text>
      <TextInput 
        onChangeText={newText => setPassCheck(newText)} 
        placeholder='enter password'  
        style={styles.textInput}
        keyboardType='numeric'
      />
      <Button 
        title="Enter"
        onPress={checkPass}
      />
      
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    padding:10
  },
  textInput:{
    borderBottomColor:"black",
    borderBottomWidth:2,
    fontSize:30,
  }
})
export default Lock