import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView,Alert,  Text, View, StyleSheet, Button} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { DirContext } from '../components/DIrContextProvider';
import Lock from '../screens/Lock'
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing'
const Recordings = () =>{

  let audioUri = ""
  const {saveTo, setSaveTo} = useContext(DirContext);
  const [auth, setAuth] = useState(false); 
  const [files, setFiles] = useState<any>([]); 
  const [sound, setSound] = useState<any>(""); 
  
  const getRecordings = async() =>{
    try {
      let recordings = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory+saveTo)
      setFiles(recordings);
    } catch (error) {
        console.error(error);
    }
  }
  const playRecordings = async() =>{
    try {
      const {sound} = await Audio.Sound.createAsync(
        {uri:audioUri},
        {shouldPlay: true}
      )
      setSound(sound);
      await sound.playAsync();
      
    } catch (error) {
      console.error(error);      
    }
  }
  const PauseAudio = async () => {
    try {
      setSound("")
    } catch (error) {
    }
  };

  const showConfirmDialog = (file:string) =>{
    return Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this audio file",
      [
        //Yes Button
        {
          text:"Yes",
          onPress: () =>{
            FileSystem.deleteAsync(FileSystem.documentDirectory+saveTo+"/"+file,{idempotent:true});
            getRecordings();
          }
        },
        {
          text:"No",
        }
      ]
    )
  }

  useEffect(()=>{
    return sound 
      ? () =>{
        sound.unloadAsync();
      }
      : undefined;
  },[sound])

  useEffect(()=>{
    getRecordings();
  },[auth, files])
  
  return(
    <SafeAreaView style={styles.container}>
      {
        !auth?
        <View>
          <Text style={{fontSize:20, borderBottomWidth:3}}>
            Current Directory: {saveTo}
          </Text>
          <Button 
            title='Update List'
            onPress={getRecordings}
          />
          <Button 
            title='Export Recordings'
            onPress={() =>{
                Sharing.shareAsync(FileSystem.documentDirectory+saveTo,{dialogTitle:`export ${saveTo}`,UTI:"Folders"})
            }}
          />

          <View>
            {
              files.length > 0 ?
              files.map((file:string,index:number) =>{
                return (
                  <View key={index} style={styles.fileContainer}>
                    <Text style={styles.fileName}>{ file.substring(file.indexOf("_"),file.indexOf("."))}</Text>
                    <View style={styles.playerButtonsContainer}>
                      <Button title="play"
                        onPress={() =>{
                          audioUri = FileSystem.documentDirectory+saveTo+"/"+file;
                          playRecordings();
                        }}
                      />
                      <Button 
                        title='pause'
                        onPress={()=>{
                          PauseAudio();
                        }}
                      />
                    </View>
                      <Button title="delete"
                        color={"red"}
                        onPress={() => showConfirmDialog(file)}
                      />

                  </View> 
                )
              })
              :
              <Text>
                No Files
              </Text>
            }
            
          </View>
        </View>
        :
        <Lock setAuth={setAuth}/>
      }
    </SafeAreaView>
  ) 
}
  const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:20,
      backgroundColor:"lightgreen",
    },
    playerButtonsContainer:{
      flexDirection:"row",
    },
    fileContainer:{
      backgroundColor:"pink",
      marginTop:10,
      padding:10,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      gap:10,
    },
    fileName:{
      fontSize:20,
      fontWeight:"400",
      flex:1,  
    }
  })

export default Recordings;