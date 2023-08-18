import React ,{useState, useEffect, useContext } from 'react';
import {View, Text, Modal,Pressable,SafeAreaView, StyleSheet, TextInput, ScrollView, RefreshControl, Alert} from 'react-native';
import IconButton from './IconButton';
import { AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system'
import { DirContext } from './DIrContextProvider';
import ensureDirExists from '../utilities/ensureDirExists';

type FilesModalType = {
  isVisible: boolean,
  onClose: () => void,
}

const FilesModal = ({isVisible, onClose}:FilesModalType) => {
  const [folders, setFolders] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string>("");
  const {saveTo, setSaveTo} = useContext(DirContext);


  const getFolders = async() =>{
    console.log("getting folders")
    const  val = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory+"");
    console.log(val);
    setFolders(val);
  }
  const createNewFolder = async() =>{
    ensureDirExists(fileName);
    setFileName("");
    getFolders();
  }
  const onRefresh = React.useCallback(()=>{
    setRefreshing(true)
    getFolders();

    setTimeout(()=>{
      setRefreshing(false)
    },700)
  },[])

  const showConfirmDialog = (file:string) =>{
    return Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this whole folder",
      [
        {
          text:"Yes",
          onPress:() =>{
            FileSystem.deleteAsync(FileSystem.documentDirectory+file);
            getFolders();
          }
        },
        {
          text:"NO"
        }
      ]
    )
  }

  

  useEffect(()=>{
    
  },[folders, isVisible,fileName])

  return(
    <Modal animationType='slide' transparent={false} visible={isVisible}>
      <SafeAreaView style={styles.container}>
        <View style={{alignItems:"flex-end",paddingHorizontal:10}}>
          <IconButton onPress={onClose}>
            <AntDesign name="close" size={32} color="black" />
          </IconButton>
        </View>
        <View style={styles.input}>
          <TextInput 
            style={styles.fileNameInput}
            placeholder='Create New Folder'
            placeholderTextColor={"gray"}
            value={fileName}
            onChangeText={(new_txt) =>{setFileName(new_txt)}}
          />
          {
            fileName.length > 0 &&
            <Pressable style={styles.addButton}
              onPress={createNewFolder}
            >
              <AntDesign name="addfolder" size={24} color="black" />
            </Pressable>
          }
        </View>
        <View style={{flex:1,}}>
          <Text>Select Folder</Text>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                colors={["black"]}
                tintColor={"black"}
              />
          }>
            <View style={styles.folderView}>
              {
                folders.map((folder:string, index:number) =>{
                  if(!folder.includes(".")){
                    return(
                      <Pressable style={folder=== saveTo? [styles.folder, styles.current]:styles.folder} key={index}
                        onPress={() =>{
                          setSaveTo(folder);
                        }}
                        onLongPress={()=>{
                          showConfirmDialog(folder);
                        }}
                      >
                        <AntDesign name="folder1" size={24} color="black" />
                        <Text>{folder}</Text>
                      </Pressable>
                      )
                  }
                  return null;
                  })
                }
            </View>

          </ScrollView>
        </View>


      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  folder:{
    flexDirection:"row",
    alignItems:"center",
    gap:5,
    backgroundColor:"#F5EBE0",
    paddingVertical:7,
    paddingHorizontal:15,
    borderRadius:20,

  },
  current:{
    borderWidth:2
  },
  folderView:{
    flexDirection:"row",
    flexWrap:"wrap",
    gap:20,
    padding:10,

  },
  scrollView:{
    flex:1,
    fontSize:30,

  },
  container:{
    flex:1,
    backgroundColor:"#D6CCC2",
    padding: 10,
  },
  input:{
    flexDirection:"row",
    alignItems:"center",
    marginVertical:10,
  
    backgroundColor:"#D5BDAF"
  },
  fileNameInput:{
    marginVertical:20,
    flex:1,
    fontSize:30,
    backgroundColor:"#D5BDAF",
    padding:20,

  },
  addButton:{
    paddingHorizontal:20,
  }
})

export default FilesModal;