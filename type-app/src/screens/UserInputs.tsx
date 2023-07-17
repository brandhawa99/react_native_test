import React , {useState}from 'react';
import {View, Text, SafeAreaView, StyleSheet, Button, TextInput} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import PlayRecording from '../components/PlayRecording';
import * as FileSystem from 'expo-file-system'
import ensureDirExists from '../utilities/ensureDirExists';
import Steps from '../components/Steps';
const UserInputs = (): JSX.Element =>{

  const [audioURI, setAudioURI] = useState<string>("");
  const [recording, setRecording] = useState<any | undefined>();
  const [audioFileName, setAudioFileName] = useState<string>("")

  
  const startRecording = async() =>{
    try {
      console.log("Requesting permission...")
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });

      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      console.log("Recording Started...");
    } catch (error) {
      console.error("Failed to start recording", error);  
    }
  }

  const stopRecording = async() =>{
    console.log("Stopping Recording...");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS:false,
    })
    const uri = recording.getURI();
    setAudioURI(uri);
    console.log("Recording stopped and store at ",uri);
  }

  const saveToDirectory = async () =>{
    try {
      await ensureDirExists("amar");
      let newFile = audioFileName.trim();
      newFile = newFile.replace(" ","_");
      await FileSystem.moveAsync({
        from: audioURI,
        to: `${FileSystem.documentDirectory}amar/${Date.now()}_${newFile}.m4a`
      })
    } catch (error) {
      console.error(error);
    }finally{
      setAudioURI("");
      setAudioFileName("")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Steps step={1}/>
      <View>
        <Button
          title={recording ? "Stop Recording": "Start Recording"}
          color={"black"}
          onPress={recording? stopRecording : startRecording}
        /> 
      </View>
      <PlayRecording sound={audioURI}/>
      <TextInput 
        placeholder='enter name'
        value={audioFileName}
        onChangeText={ newText => {setAudioFileName(newText)}}
      />
      {
        audioURI.length ? 
        <Button 
          title='Save Recording'
          onPress={saveToDirectory}
        />
        : null
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"lightgreen",
  }
})


export default UserInputs;