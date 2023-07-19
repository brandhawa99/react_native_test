import React , {useState, useEffect}from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system'
import ensureDirExists from '../utilities/ensureDirExists';
import Steps from '../components/Steps';
import RecordMsg from '../components/RecordMsg';
import NameInputs from '../components/NameInput';
import RecordButtons from '../components/RecordButtons';
import ClosingPage from '../components/ClosingPage';
import NavigationButtons from '../components/NavigationButtons'


const UserInputs = (): JSX.Element =>{
  
  const [sound, setSound] = useState<any>();
  const [audioURI, setAudioURI] = useState<string>("");
  const [recording, setRecording] = useState<any | undefined>();
  const [audioFileName, setAudioFileName] = useState<string>("")
  const [page, setPage] = useState<number>(1)


  const nextPage = () => {
    if(page === 4){
      setPage(1)
    }else{
      setPage(page + 1);
    }
  } 
  const lastPage = () =>{
    if(page !== 1){
      setPage(page - 1);
    }
  } 
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

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      {uri:audioURI},
      {shouldPlay:true}
      )
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(()=>{
    console.log(audioFileName)
  },[audioFileName])

  return (
    <SafeAreaView style={styles.container}>
      {
        page === 1 &&
          <Steps step={1} stepTxt={"Record Your Message!"}>
            <RecordMsg 
              stopFunc={stopRecording}
              recordFunc={startRecording}
              playFunc={playSound}
              isRecording={recording}
            />
          </Steps>
      }
      {
        page === 2 &&
          <Steps step={2} stepTxt={"Enter Your Name!"}>
            <NameInputs setAudioFileName={setAudioFileName} />
          </Steps>
      }
      {
        page == 3 &&
          <Steps step={3} stepTxt='Save Your Recording'>
            <RecordButtons buttonColor={"#94D7E9"} text='Save' press={saveToDirectory} />
          </Steps>
      }
      {
        page == 4 &&
        <ClosingPage username={audioFileName}/>
      }
      <NavigationButtons next={nextPage} prev={lastPage} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"flex-start",
    alignItems:"stretch",
    backgroundColor:"black",
  }
})


export default UserInputs;