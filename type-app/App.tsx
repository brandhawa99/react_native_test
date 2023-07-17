import { SafeAreaView, StyleSheet, Text, Button, View, TextInput } from 'react-native';
import {addListener, useKeepAwake} from 'expo-keep-awake'
import React, { useState } from 'react';
import { Audio } from 'expo-av'
import PlayRecording from './src/components/PlayRecording';
import * as FileSystem from 'expo-file-system'

export default function App() {
  useKeepAwake();
  const directoryName = "amar"
  const [link, setLink] = useState<any>();

  const [recording, setRecording] = useState<any>();
  const [userName, setName] = useState<any>();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    setLink(uri);
    console.log('Recording stopped and stored at', uri);

  }
  // TODO: On save move audio file from cache to document directory
  const saveToDirectory = async() =>{
    try{
      const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory+directoryName);
      if(!dirInfo.exists){
        console.log("creating directory...")
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+directoryName,{intermediates:true})
      }
      let newFile = userName.trim();
      newFile = newFile.replace(" ","_")
      await FileSystem.moveAsync({
        from:link,
        to:`${FileSystem.documentDirectory}${directoryName}/${Date.now()}_${newFile}.m4a`
      })
    }catch(err){
      console.error(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons} >
  
        <Button 
          title={recording ? "Stop Recording":"Start Recording"}
          color={"black"}
          onPress={recording ? stopRecording : startRecording}
        />
      </View>
      <PlayRecording sound={link}/>
      <TextInput 
        style={styles.input}
        placeholder="enter name"
        value={userName}
        onChangeText={ newText => {setName(newText);console.log(newText);}}
        
      />
      {
        link ?
      <Button 
        title='Save Recording'
        onPress={saveToDirectory}
      />: null
      }
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input:{
    color:"white",
    backgroundColor:"lightblue",
    fontSize:20,
    paddingVertical:5,
    paddingHorizontal:10,
    width:200,
    justifyContent:"center",
    alignItems:"center",
  },
  container: {
    flex:1,
    backgroundColor: '#000',
    color:"white",
    alignItems: 'center',
    justifyContent: 'center'
  },
  txt:{
    color:"white",
  },
  buttons:{
    backgroundColor:"lightblue",
    fontWeight:"bold"
  }
});
