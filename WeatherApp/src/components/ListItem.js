import React from "react"
import {View, Text, StyleSheet} from 'react-native'
import { Feather } from '@expo/vector-icons';


const ListItem = (props) => {
  const {dt_txt, min, max, condition} = props
  return (
    <View style={styles.item}>
      <Feather name={"sun"} color={"white"}/>  
      <Text style={styles.date}>{dt_txt}</Text>
      <Text style={styles.temp}>{min}</Text>
      <Text style={styles.temp}>{max}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item:{
    backgroundColor:'pink',
    padding:20,
    marginVertical:8,
    marginHorizontal:16,
    flexDirection:"row",
    alignItems:"center",
    borderWidth:"5",
    justifyContent:"space-around",
  },
  date:{
    fontSize:15,
    color:"white"
  },
  temp:{
    fontSize:20,
    color:"white"
  },
})

export default ListItem