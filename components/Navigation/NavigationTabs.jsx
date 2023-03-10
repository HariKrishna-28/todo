import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Default, NewTask, User } from '../../screens';

const NavigationTabs = () => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 15,
                    right: 15,
                    elevation: 0,
                    borderRadius: 10,
                    height: 90,
                    backgroundColor: 'black',
                }
            }}
        >
            <Tab.Screen name="Default" component={Default} />
            <Tab.Screen name="User" component={User} />
            <Tab.Screen name="NewTask" component={NewTask} />
        </Tab.Navigator>
    )
}

export default NavigationTabs