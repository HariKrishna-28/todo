import { View, Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, provider } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Signup = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [confPass, setConfPass] = useState("")
    const [user, loading, err] = useAuthState(auth)
    const [error, setError] = useState("")

    const navigation = useNavigation()

    const checkPasswordFlag =
        (pass === confPass) && (pass !== "") && (confPass !== "")

    const clearError = () => setError("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        if ((pass === "" || confPass === "") || (pass === confPass)) clearError()
        if (pass !== confPass) {
            setError("Passwords dont match")
        }
    }, [pass, confPass])

    const SignUp = () => {
        clearError()
        auth.createUserWithEmailAndPassword(email, pass)
            .then(() => {
                navigation.navigate("Home")
            })
            .catch(error => setError(error.message))
    }

    return (
        <SafeAreaView className="bg-backGround">
            <KeyboardAvoidingView
                behavior='padding'
                className="flex flex-col items-center justify-center h-screen bg-backGround"
            >
                <View>
                    <Text className="p-5 font-bold text-center text-white font-2xl">
                        Sign up
                    </Text>
                </View>
                <View className="space-y-2 w-[300px]">
                    <TextInput
                        className="p-3 text-white rounded-sm bg-secondaryBackground"
                        onChangeText={text => setEmail(text)}
                        placeholderTextColor="grey"
                        placeholder="Email"
                        keyboardType='email-address'
                    />
                    <TextInput
                        secureTextEntry
                        className="p-3 text-white rounded-sm bg-secondaryBackground"
                        onChangeText={text => setPass(text)}
                        placeholder="Password"
                        placeholderTextColor="grey"
                    />
                    <TextInput
                        secureTextEntry
                        className="p-3 text-white rounded-sm bg-secondaryBackground"
                        onChangeText={text => setConfPass(text)}
                        placeholder="Confirm Password"
                        placeholderTextColor="grey"
                    />
                </View>
                <View className="w-1/3 mt-5">
                    <TouchableOpacity>
                        <Button
                            disabled={!checkPasswordFlag}
                            onPress={SignUp}
                            title="Sign Up"
                        />
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center justify-center gap-1 mt-2">
                    <Text className="text-white "> Have an account?</Text>
                    <Text
                        className="text-blue-500"
                        onPress={() => navigation.navigate("Login")}>Login</Text>
                </View>
                {error &&
                    <View className="w-[300px] mt-3 p-2 bg-red-700 rounded-sm">
                        <Text className="text-white">
                            {error}
                        </Text>
                    </View>
                }
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default Signup


