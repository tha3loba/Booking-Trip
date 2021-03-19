import React,{useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Loading = ({navigation}) => {


  const detectLogin= async ()=>{
    const token = await AsyncStorage.getItem('token')
        if(token){
              navigation.replace("Browse")
        }else{
            navigation.replace("Home")
        }
  }
  useEffect(()=>{
   detectLogin()
  },[])

  return (
   <View style={styles.loading}> 
    <ActivityIndicator size="large" color="blue" />
   </View>
  );
};


const styles= StyleSheet.create({
    loading:{
     flex:1,
    justifyContent:"center",
    alignItems:"center" 
    }
    
  })


export default Loading;