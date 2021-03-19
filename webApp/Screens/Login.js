import React,{ useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from "react-native-vector-icons/Feather"
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


const Login = ({navigation}) => {

    const [Data, setData]  = useState({
        email: "",
        password: "",
        check_TextInputChange: false,
        secureTextEntry: true
    })

    const TextInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...Data,
                email: val,
                check_TextInputChange: true
            })
        }
        else {
            setData({
                ...Data,
                email: val,
                check_TextInputChange: false
            })
        }
    } 

    const handlePasswordChange = (val) => {
        setData({
            ...Data,
            password: val
        })
    }

    const updateSecureTextEntry = () => {
        setData({
            ...Data,
            secureTextEntry: !Data.secureTextEntry
        }) 
    }

    const sendCred = async () => {
        try {
            let response = await axios.post('http://10.0.2.2:5000/api/users/login-user', { ...Data })
            console.log("token = ",response.data.token)
            AsyncStorage.setItem('token', response.data.token).then(() =>  navigation.replace("Browse"))
            console.log("Async Storage = ",AsyncStorage.token)
         } catch (err) {
             Alert.alert("Erreur", 'Invalid login credentials', [
                 {
                     text: 'Cancel', onPress: () => console.log('Cancel Pressed')
                 }
             ])
         }
    }



    return(
           <View style={styles.container}>
               <View style={styles.hedaer}>
                    <Text style={styles.textHeader}>Login</Text>
               </View>
               <Animatable.View style={styles.footer} animation="fadeInUpBig">
                    <Text style={styles.textFooter}>Email</Text>
                    <View style={styles.actions}>
                        <FontAwesome 
                            name="user-o"
                            size={20}
                            color="#0AC4BA"
                        />
                    <TextInput 
                        placeholder="Enter Your Email"
                        style={styles.TextInput}
                        autoCapitalize="none"
                        onChangeText={(val) => TextInputChange(val)}
                    />
                    {Data.check_TextInputChange ? 
                        <Animatable.View
                            animation="bounceIn">
                        <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                        />
                        </Animatable.View>
                        : null}
                  </View>
                    <Text style={[styles.textFooter], {marginTop: 35}}>Password</Text>
                    <View style={styles.actions}>
                    <FontAwesome 
                            name="lock"
                            size={20}
                            color="#0AC4BA"
                        />
                    <TextInput 
                        placeholder="Enter your Password"
                        style={styles.TextInput}
                        autoCapitalize="none"
                        secureTextEntry={Data.secureTextEntry ? true : false}
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >{Data.secureTextEntry ? 
                        <Feather 
                            name="eye-off"
                            color="grey"
                            size={20}
                        /> 
                        :
                        <Feather 
                            name="eye"
                            color="grey"
                            size={20}
                        />
                    }
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button}  onPress={() => sendCred()}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            locations={[0.1, 0.9]}
                            colors={["#0AC4BA", "#2BDA8E"]}
                            style={styles.login}
                        >
                            <Text style={styles.textLogin}>Login</Text>
                        </LinearGradient>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUp')}
                            style={styles.SignupButton}
                        >
                            <Text style={styles.textSignupButton}>SignUp</Text>
                        </TouchableOpacity>
                    
                    </TouchableOpacity>
               </Animatable.View>
           </View>
        )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0AC4BA'
    },
    hedaer: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    textHeader: {
        color: "#FFF",
        fontWeight: 'bold',
        fontSize: 30
    },
    textFooter: {
        color: '#05375a',
        fontSize: 18
    },
    actions: {
        flexDirection: "row",
        paddingBottom: 5,
        marginTop: 10
    },
    TextInput: {
        flex: 1,
        paddingLeft: 10,
        marginTop: -12
    },
    button: {
        alignItems: "center",
        marginTop: 50
    },
    login: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    textLogin: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#FFF'
    },
    SignupButton: {
        borderColor: '#0AC4BA',
        borderWidth: 2,
        marginTop: 10,
        width: 350,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    textSignupButton: {
        fontSize: 18,
        fontWeight: "bold",
    }
    })
