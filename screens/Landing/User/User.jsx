import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';

const User = () => {
    const navigation = useNavigation()
    const [user, uLoad, uError] = useAuthState(auth)

    const signOut = () => {
        // navigation.goBack().navigate('Login')
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }]
        })
        // auth.signOut()
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        if (uLoad) return
        if (!user) {
            navigation.navigate('Login')
        }
    }, [user, uLoad])

    return (
        <SafeAreaView className="h-full bg-backGround">
            <View>
                <View>
                    <TouchableOpacity>
                        <Button
                            title='Signout'
                            onPress={signOut}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default User