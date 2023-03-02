import { View, Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, provider } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [user, loading, err] = useAuthState(auth)
    const [error, setError] = useState("")
    const navigation = useNavigation()

    const formValidator = (email !== "") && (pass !== "")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        if (loading) return
        if (user) {
            navigation.navigate("Home")
        }
    }, [user, loading])

    const SignIn = () => {
        setError("")
        auth.signInWithEmailAndPassword(email, pass)
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
                    <Text className="p-5 text-3xl font-bold text-center text-white font-2xl">
                        Welcome to todododo!
                    </Text>
                </View>
                <View className="space-y-2 w-[300px] ">
                    <TextInput
                        className="p-3 text-white rounded-sm bg-secondaryBackground"
                        onChangeText={text => setEmail(text)}
                        placeholderTextColor="grey"
                        placeholder="Email"
                        autoCapitalize='false'
                        keyboardType='email-address'
                    />
                    <TextInput
                        secureTextEntry
                        className="p-3 text-white rounded-sm bg-secondaryBackground"
                        onChangeText={text => setPass(text)}
                        placeholder="Password"
                        placeholderTextColor="grey"

                    />
                </View>
                <View className="w-1/3 mt-5">
                    <TouchableOpacity>
                        <Button
                            onPress={SignIn}
                            disabled={!formValidator}
                            // onPress={() => navigation.navigate("Login")}
                            title="Log in"
                        />
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center justify-center gap-1 mt-2">
                    <Text className="text-white "> New user?</Text>
                    <Text
                        className="text-blue-500"
                        onPress={() => navigation.navigate("SignUp")}>Register</Text>
                </View>
                <View className="flex flex-row items-center justify-center gap-1 mt-2">
                    {/* <Text className="text-white "> New user?</Text> */}
                    <Text
                        className="text-blue-500"
                        onPress={() => navigation.navigate("ForgotPass")}>Forgot Password?</Text>
                </View>
                {error &&
                    <View className="w-[300px] mt-3 p-2 bg-red-700 rounded-sm">
                        <Text className="text-white">
                            {error}
                        </Text>
                    </View>
                }
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login