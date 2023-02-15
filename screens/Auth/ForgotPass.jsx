import { View, Text, KeyboardAvoidingView, Button, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../firebase';


const ForgotPass = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const navigation = useNavigation()
    const [load, setLoad] = useState(false)

    const resetPass = () => {
        setLoad(true)
        try {
            auth.sendPasswordResetEmail(email)
            setMessage("Check Your Inbox for further Instructions")
        } catch (error) {
            setError("Please try again later")
        }
        setLoad(false)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <SafeAreaView className="bg-backGround">
            <KeyboardAvoidingView
                behavior='padding'
                className="flex flex-col items-center justify-center h-screen bg-backGround"
            >
                <View>
                    <Text className="p-5 text-3xl font-bold text-center text-white font-2xl">
                        Enter your email address
                    </Text>
                </View>

                <View className="space-y-2 w-[300px] ">
                    <TextInput
                        className="p-3 text-white rounded-sm bg-secondaryBackground"
                        onChangeText={text => setEmail(text)}
                        placeholderTextColor="grey"
                        placeholder="Email"
                        keyboardType='email-address'
                    />
                </View>
                <View className="w-1/2 mt-5">
                    {!message ?
                        <TouchableOpacity>
                            <Button
                                onPress={resetPass}
                                disabled={email === ""}
                                // onPress={() => navigation.navigate("Login")}
                                title="Send reset link"
                            />
                        </TouchableOpacity>
                        :
                        <Text className="font-bold text-white">
                            {!load
                                ?
                                <Text className="justify-center">{message}</Text>
                                : <ActivityIndicator />}

                        </Text>
                    }
                </View>
                <View className="flex flex-row items-center justify-center gap-1 mt-2">
                    {/* <Text className="text-white "> New user?</Text> */}
                    <Text
                        className="text-blue-500"
                        onPress={() => navigation.navigate("SignUp")}>Back to login</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ForgotPass