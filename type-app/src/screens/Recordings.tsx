import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView,Alert,  Text, View, StyleSheet, ScrollView, Pressable} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { DirContext } from '../components/DIrContextProvider';
import Lock from '../screens/Lock'
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing'
import IconButton from '../components/IconButton';
import { AntDesign } from '@expo/vector-icons';
import VoiceFile from '../components/VoiceFile'
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilesModal from '../components/FilesModal';



const Recordings = () =>{

  const {saveTo, setSaveTo} = useContext(DirContext);
  const [auth, setAuth] = useState(false); 
  const [files, setFiles] = useState<any>([]); 
  const [sound, setSound] = useState<any>(""); 
  const [isVisible, setVisible] = useState<boolean>(false)
  const closeModal = () =>{
    setVisible(false);
  }

  
  const getRecordings = async() =>{
    try {
      let recordings = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory+saveTo)
      setFiles(recordings);
    } catch (error) {
        console.error(error);
    }
  }
  const playRecordings = async(link:string) =>{
    try {
      const {sound} = await Audio.Sound.createAsync(
        {uri:link},
        {shouldPlay: true}
      )
      setSound(sound);
      console.log("playing");
      await sound.playAsync();
      
    } catch (error) {
      console.error(error);   
    }
  }
  const PauseAudio = async () => {
    try {
      setSound("")
    } catch (error) {
      console.log(error);
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
        <ScrollView>
          {
            <FilesModal 
              isVisible={isVisible}
              onClose={closeModal}
            />
          }

          <View style={styles.header}>
            <Pressable style={styles.folderButton}
              onPress={()=>{setVisible(true)}}
            >
              <AntDesign name="folder1" size={24} color="black" />
              <Text style={{fontSize:20, borderBottomWidth:3}}>
              {saveTo}
              </Text>
            </Pressable>
          </View>
          
          <View style={styles.iconButtons}>
            <IconButton   
            onPress={() =>{
              Sharing.shareAsync(FileSystem.documentDirectory+saveTo,{dialogTitle:`export ${saveTo}`,UTI:"Folders"})
            }}
            >
              <AntDesign name="export" size={32} color="black" />
            </IconButton>
            
            <IconButton   
            onPress={() =>{
              getRecordings();
            }}
            >
              <MaterialIcons name="update" size={32} color="black" />
            </IconButton>
          </View>
          
          <View style={styles.voiceContainer}>
            {
              files.length > 0 ?
              files.map((file:string,index:number) =>{
                return (
                  <VoiceFile 
                    key={index} 
                    fileName={file}
                    play={playRecordings}
                    stop={PauseAudio}
                    trash={showConfirmDialog}
                  />
                )})
              :
              <Text style={{fontSize:25, fontWeight:"bold"}}>
                No Files
              </Text>
            }
            
          </View>
        </ScrollView>
        :
        <Lock setAuth={setAuth}/>
      }
    </SafeAreaView>
  ) 
}
  const styles = StyleSheet.create({
    container:{
      backgroundColor:"#D5BDAF",
      flex:1,
    },
    folderButton:{
      backgroundColor:"#EDEDE9",
      flexDirection:"row",
      gap:20,
      padding:10,
      borderRadius:40,
      paddingHorizontal:20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,
      
    },
    header:{
      padding:10,
      justifyContent:"center",
      alignItems:"center",
    },
    voiceContainer:{
      flexWrap:"wrap", 
      flexDirection:"row",
      alignItems:"center",
      gap:10,
      marginHorizontal:10,
    },
    iconButtons:{
      paddingHorizontal:10,
      flexDirection:"row",
      justifyContent:"space-between"
    },
  })

export default Recordings;