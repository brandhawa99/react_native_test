import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Button, StyleSheet, TextInput, View, Text} from 'react-native';
import { DirContext } from '../components/DIrContextProvider';
import Lock from '../screens/Lock'

const Settings = () =>{
  const {saveTo, setSaveTo} = useContext(DirContext)
  const [auth ,setAuth]  = useState(false); 
  const [saveLocation, setSaveLocation] = useState(saveTo)
  useEffect(()=>{

  },[auth, saveLocation])
  return(
    <SafeAreaView style={styles.container}>
      {
        !auth ?
        <Lock setAuth={setAuth} />
          :
        <View style={styles.container}>
          <Text style={{fontSize:20}}>
            Messages Save Location
          </Text>
          <TextInput
          style={{borderBottomWidth:3, fontSize:20, backgroundColor:"lightblue", borderRadius:10,paddingHorizontal:10, fontWeight:"300", paddingVertical:5,

        }}
          value={saveLocation}
          onChangeText={txt => setSaveLocation(txt)}
          />
          <Button 
            title='Enter'
            onPress={()=>{
              setSaveTo(saveLocation);
            }}
          />
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10, 
  }
})

export default Settings