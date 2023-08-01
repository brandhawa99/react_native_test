import React, { useState } from 'react';
import {Button, View, Text, TextInput, StyleSheet} from 'react-native'
import { Link } from '@react-navigation/native'

type LockType = {
  unLock : () => void;
}

const Lock = ({unLock}: LockType) =>{

  const [passCheck , setPassCheck] = useState<String>();
  const pass: String = "2015"
  const checkPass =() =>{
    if(passCheck == pass){
      unLock()
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
      <Link to={{screen:"Record"}}>
        GO BACK
      </Link>
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