import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserInputs from '../screens/UserInputs';
import Settings from '../screens/Settings';
import Recordings from '../screens/Recordings';
import {MaterialCommunityIcons, Ionicons, Entypo, AntDesign} from "@expo/vector-icons"
import DirContextProvider from './DIrContextProvider';

const Tab = createBottomTabNavigator();

const Tabs = () =>{

  return(
    
    <NavigationContainer>
      <DirContextProvider >
      <Tab.Navigator screenOptions={{
        tabBarActiveBackgroundColor:"white",
        tabBarInactiveBackgroundColor:"white",
        tabBarAllowFontScaling:true,
      tabBarStyle:{
        backgroundColor:'black',
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
      </DirContextProvider>
    </NavigationContainer>
  )
}

export default Tabs