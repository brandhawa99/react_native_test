import * as FileSystem from 'expo-file-system'


const ensureDirExists  = async (dirName:string): Promise<void> => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory+dirName) 
    if(!dirInfo.exists){
      console.log("creating Directory...");
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+dirName,{intermediates:true})
      console.log("Directory created");
    }
  } catch (error) {
    
  }
}

export default ensureDirExists;