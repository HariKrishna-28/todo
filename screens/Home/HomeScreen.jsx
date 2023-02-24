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



    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    useEffect(() => {
        if (loading) return
        if (!user) navigation.navigate("Login")
        if (user?.email) {
            createDatabase(user.email)
            setLoad(false)
        }
    }, [user, loading])

    const createDatabase = async (user) => {
        const userEmail = user.slice(0, user.indexOf('@'))
        getDoc(doc(db, "user-todo", userEmail))
            .then((docSnap) => {
                if (docSnap.exists()) {
                    console.log(`Collection for ${userEmail} already exists`);
                } else {
                    console.log(`Collection for ${userEmail} does not exist`);
                    // Create the user's collection here
                    setDoc(doc(db, "user-todo", userEmail), { /* collection data here */ })
                        .then(() => {
                            console.log(`Collection for ${userEmail} successfully created!`);
                        })
                        .catch((error) => {
                            console.error(`Error creating collection for ${userEmail}: `, error);
                        });
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }

    return (
        <SafeAreaView className="h-full bg-backGround">
            <Text className="text-white">hi {user?.email ? user.email : "No user"}</Text>

        </SafeAreaView>
    )
}

export default HomeScreen