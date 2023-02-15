import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'


const HomeScreen = () => {
    const [user, loading, error] = useAuthState(auth)
    const navigation = useNavigation()


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        if (loading) return
        if (!user) navigation.navigate("Login")
    }, [user, loading])

    return (
        <SafeAreaView className="h-full bg-backGround">
            <Text className="text-white">{user?.email ? user.email : "No user"}</Text>
        </SafeAreaView>
    )
}

export default HomeScreen