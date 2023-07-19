import React from 'react';
import {useKeepAwake} from 'expo-keep-awake'
import UserInputs from './src/screens/UserInputs';
import Settings from './src/screens/Settings';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {Ionicons,MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import Recordings from './src/screens/Recordings';
import { StatusBar } from 'react-native';
const Tab = createBottomTabNavigator();
export default function App() {
  useKeepAwake();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarActiveBackgroundColor:"white",
        tabBarInactiveBackgroundColor:"black",
        tabBarStyle:{
          backgroundColor:'black'
        },
        headerStyle:{
          backgroundColor:"black",
        },
        headerTitleStyle:{
          color:"white",
          fontSize:25,
          fontWeight:"bold",
        }
      }}>
        <Tab.Screen 
          name="Record" 
          component={UserInputs}
          options={{
            tabBarIcon: 
              ({focused})=> !focused ? 
              <MaterialCommunityIcons name="record-circle-outline" size={24} color="black" />:
              <MaterialCommunityIcons name="record-circle" size={24} color="black" />
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={Settings}
          options={{
            tabBarIcon: 
              ({focused}) => focused ? 
              <Ionicons name="settings" size={24} color="black" />:
              <Ionicons name="settings-outline" size={24} color="black" />
          }}
        />
        <Tab.Screen 
          name="Files"
          component={Recordings}
          options={{
            tabBarIcon:({focused}) => focused ?
            <Entypo name="folder" size={24} color="black" />:
            <AntDesign name="folder1" size={24} color="black" />
          }}
        />
        </Tab.Navigator>
    </NavigationContainer>
  );
}


