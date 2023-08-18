import React ,{useContext} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { DirContext } from './DIrContextProvider';


type VoiceFileType = {
  fileName: string;
  play: (file:string) => void;
  stop: () => void;
  trash: (file:string) => void; 

}
const VoiceFile = (props:VoiceFileType) =>{
  const { fileName, play, stop , trash } = props;
  const {saveTo} = useContext(DirContext)

  return(
    <View style={styles.container}>
      <Text style={styles.txt}>
        {fileName.substring(fileName.indexOf("_")+1,fileName.indexOf("."))}
      </Text>
      <View style={styles.buttons}>
        <Pressable
          onPress={() =>{
            play(FileSystem.documentDirectory+saveTo+"/"+fileName)
          }}
        >
          <Entypo name="controller-play" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={stop}
        >
          <Entypo name="controller-stop" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={()=> trash(fileName)}
        >
          <AntDesign name="delete" size={22} color="black" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#F5EBE0",
    borderRadius:20,
    height:130,
    justifyContent:"space-around",
    padding:5,
    width:172,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txt:{
    fontSize:18,
    alignSelf:"center"
  },
  buttons:{
    flexDirection:"row",
    justifyContent:"space-around",
    gap:10,
  }
})

export default VoiceFile;