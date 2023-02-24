import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { doc, setDoc, addDoc, collection, getDoc, Timestamp } from "firebase/firestore";

const HomeScreen = () => {
    const [user, loading, error] = useAuthState(auth)
    const navigation = useNavigation()
    const [load, setLoad] = useState(true)
    // const userCollectionRef = collection(db, "user-todo", user?.email)

    const initialiseNewUser = async (user) => {
        const userEmail = user.slice(0, user.indexOf('@'))
        getDoc(doc(db, "user-todo", userEmail))
            .then((docSnap) => {
                if (!docSnap.exists()) {
                    createDatabase(userEmail)
                }
                else { console.log("User Exists") }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }

    const createDatabase = async (userEmail) => {
        try {
            await setDoc(doc(db, "user-todo", userEmail))
            console.log("created user")
        } catch (error) {
            console.log(error)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    useEffect(() => {
        if (loading) return
        if (!user) navigation.navigate("Login")
        if (user?.email) {
            initialiseNewUser(user.email)
            setLoad(false)
        }
    }, [user, loading])



    return (
        <SafeAreaView className="h-full bg-backGround">
            <Text className="text-white">hi {user?.email ? user.email : "No user"}</Text>

        </SafeAreaView>
    )
}

export default HomeScreen