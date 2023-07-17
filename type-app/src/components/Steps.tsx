import React from 'react';
import {SafeAreaView, View, Text,StyleSheet} from 'react-native';

type StepsProps = {
  step:number
  children?:JSX.Element
}
const Steps = ({step, children}:StepsProps) =>{

return(
  <SafeAreaView style={styles.container}>
    <View >
      <Text style={styles.step} >
        {step}
      </Text>
    </View>
    {
      children
    }
  </SafeAreaView>
)

}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"lightblue",
    paddingHorizontal:10,
    paddingVertical: 20,
  },
  step:{
    fontSize:40,
  }
})

export default Steps