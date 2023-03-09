import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Default, NewTask, User } from '../../screens';

const NavigationTabs = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator>
            <Tab.Screen name="Default" component={Default} />
            <Tab.Screen name="User" component={User} />
            <Tab.Screen name="NewTask" component={NewTask} />
        </Tab.Navigator>
    )
}

export default NavigationTabs