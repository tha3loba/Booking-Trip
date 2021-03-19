import React from 'react';

import {
    View, Image, TouchableOpaicty
} from 'react-native';

import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";

import  Browse  from '../Screens/Browse';
import Settings from '../Screens/Settings';
import Search from '../Screens/Search';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return( 
        <Tab.Navigator tabBarOptions={{showLabel: false, style: { borderBottomWidth: 0,
        backgroundColor: "transparent", elevation: 0, borderTopColor: "#0AC4BA", borderTopWidth: 1}}}>
            <Tab.Screen 
                name="Browse" 
                component={Browse}
                options={{ 
                    tabBarIcon: ({focused}) => (
                        <Image source={require('../asset/images/house5.png')} 
                            resizeMode="contain"
                            style={{ height: 25, width: 25, tintColor: focused ? "#0AC4BA" : "#C5CCD6"}}
                        />                        
                    )
                }}
            />
            <Tab.Screen 
                name="Search" 
                component={Search}
                options={{ 
                    tabBarIcon: ({focused}) => (
                        <Image source={require('../asset/images/search.png')} 
                            resizeMode="contain"
                            style={{ height: 25, width: 25, tintColor: focused ? "#0AC4BA" : "#C5CCD6"}}
                        />                        
                    )
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={Settings}
                options={{ 
                    tabBarIcon: ({focused}) => (
                        <Image source={require('../asset/images/user.png')} 
                            resizeMode="contain"
                            style={{ height: 25, width: 25, tintColor: focused ? "#0AC4BA" : "#C5CCD6"}}
                        />                        
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;