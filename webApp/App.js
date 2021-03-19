import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import Home from './Screens/Home'
import Login from "./Screens/Login"
import Signup from './Screens/Signup'
import Browse from "./Screens/Browse"
import Loading from './Screens/Loading';
import Settings  from './Screens/Settings';
import Tabs from "./navigation/Tabs"
import Search from './Screens/Search';
import Houses from "./Screens/Houses"

const Stack = createStackNavigator();

const App =  () => {

  const [isloggedin,setLogged] = useState(null)

  const detectLogin = async ()=>{
     const token = await AsyncStorage.getItem('token')
     if(token){
         setLogged(true)
     }else{
         setLogged(false)
     }
  }
 useEffect(()=>{
    detectLogin()
 },[])


  return (
    <NavigationContainer> 
      <Stack.Navigator> 
        <Stack.Screen name='Loading' component={Loading} />
        <Stack.Screen name="Browse" component={Tabs} options={{headerShown: false}}/> 
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name="Settings" component={Tabs} />
        <Stack.Screen name="Search" component={Tabs} />
        <Stack.Screen name="Houses" component={Houses} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;