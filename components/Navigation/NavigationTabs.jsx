import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Default, NewTask, User } from '../../screens';

const NavigationTabs = () => {

    const Tab = createBottomTabNavigator()

    const CustomTabBarButton = ({ children, onPress }) => {
        <TouchableOpacity
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPress={onPress}
        >
            <View style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: 'red',
            }}>
                {children}
            </View>
        </TouchableOpacity>
    }

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
            <Tab.Screen name="NewTask" component={NewTask}
            // options={{
            //     // tabBarIcon:({focused}) =>(
            //     //     <Image 
            //     //         source={require('https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fplus&psig=AOvVaw0MGv55swOV_uei0cd28iLR&ust=1679150010237000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMjYpLCX4_0CFQAAAAAdAAAAABAE')}
            //     //         resize
            //     //     />
            //     // ),
            //     tabBarButton: (props) => (
            //         <CustomTabBarButton {...props} />
            //     )
            // }}
            />
        </Tab.Navigator>
    )
}

export default NavigationTabs