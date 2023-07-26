import React from 'react';
import {SafeAreaView, View, Text,StyleSheet} from 'react-native';

type StepsProps = {
  step:number
  stepTxt:string
  children?:JSX.Element
}
const Steps = ({step, stepTxt, children}:StepsProps) =>{

return(
  <SafeAreaView style={styles.container}>
    <View style={styles.stepsContainer}>
      <Text style={[styles.step,styles.stepNumber]} >
        {step}.
      </Text>
      <Text style={styles.step}>
        {stepTxt}
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
    backgroundColor:"#D5BDAF",
    paddingHorizontal:10,
    paddingVertical: 20,
    justifyContent:"center",

  },
  stepsContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:10,
    marginBottom:50,
  },
  step:{
    fontSize:30,
  },
  stepNumber:{
    fontWeight:"bold"
  }
})

export default Steps