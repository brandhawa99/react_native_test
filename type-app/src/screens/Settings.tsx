import React, {} from 'react';
import { SafeAreaView, Button, StyleSheet} from 'react-native';


const Settings = () =>{

  return(
    <SafeAreaView style={styles.container}>
      <Button 
        title='settings'
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    
  }
})

export default Settings