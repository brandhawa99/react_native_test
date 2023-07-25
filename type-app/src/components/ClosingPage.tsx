import React from 'react';
import {View, Text, StyleSheet} from 'react-native';



const ClosingPage = ({username}:any) =>{

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Your message has been saved {username}. The couple thanks you for your wonderful message ❤️ You are done!</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:"center",
    paddingHorizontal:10,
    backgroundColor:"#D5BDAF"
  },
  text:{
    fontSize:30,
    fontWeight:'400',
    lineHeight:35,
    textAlign:"center"
  }
})
export default ClosingPage