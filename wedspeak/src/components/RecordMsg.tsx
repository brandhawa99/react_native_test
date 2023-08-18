import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import RecordButtons from './RecordButtons';


type RecordMsgType = {
  uri: string; 
  recordFunc : () => void;
  playFunc : () => void;
  stopFunc : () => void;
  isRecording : boolean; 
}

const RecordMsg = ({recordFunc, playFunc, stopFunc, isRecording, uri}:RecordMsgType) =>{

  
  return(
    <View>
      
        <View style={styles.buttonsContainer}>
          {
            isRecording ?
              <RecordButtons text="Stop Recording" press={stopFunc} >
                <Entypo name="controller-stop" size={40}/>
              </RecordButtons>
              :
              <RecordButtons text={"Start Recording"} press={recordFunc} buttonColor='#FB6767'>
                <Entypo name='controller-record' size={40}/>
              </RecordButtons>
          }
          {
            uri.length>0 ?
              <RecordButtons text="Play Recording" press={playFunc} buttonColor='#90EE90'>
                <Entypo  name="controller-play" size={40}/>
              </RecordButtons>
            : null
          }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons:{
    justifyContent:"center",
    alignItems:"center",
  },
  buttonsContainer:{
    flexDirection:"row",
    justifyContent:"center",

  }
})

export default RecordMsg;