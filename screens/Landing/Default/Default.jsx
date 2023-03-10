import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../../firebase';
import { doc, setDoc, addDoc, collection, getDoc, Timestamp, getDocs } from "firebase/firestore";
import { Loader, Taskbox } from '../../../components';
import NewTodoModal from '../../../components/Modal/NewTodoModal';
import { NavigationContainer } from '@react-navigation/native'

const Default = () => {
    const [user, loading, error] = useAuthState(auth)
    const navigation = useNavigation()
    const [load, setLoad] = useState(true)
    const [taskModal, setTaskModal] = useState(false)
    // const userCollectionRef = collection(db, "user-todo", user?.email)

    const openTaskModal = () => setTaskModal(true)
    const closeTaskModal = () => setTaskModal(false)

    // check if the user already has a collection
    const initialiseNewUser = async (userEmail) => {
        const newCollectionRef = collection(db, userEmail);
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

    async function createCollectionIfNotExists(userEmail) {

        try {
            const userEmailCollectionRef = collection(db, userEmail);
            const snapshot = await getDocs(userEmailCollectionRef);
            // const newwDocRef = userEmailCollectionRef.getDoc()
            // const collectionExists = querySnapshot.exists()
            // const collectionExists = querySnapshot.docs.some(
            //     (doc) => doc.id === userEmail
            // );

            if (snapshot.empty) {
                // newDocRef.set({})
                // Collection does not exist, so create a new document to create the collection
                const newDocRef = await addDoc(userEmailCollectionRef, {});
                console.log(`New collection "${userEmailCollectionRef.id}" created with document "${newDocRef.id}"`);
            } else {
                console.log(`Collection "${userEmailCollectionRef.id}" already exists with ${snapshot.size} documents`);
            }
        } catch (error) {
            console.error('Error checking or creating collection: ', error);
        }
    }
    // create a collection for a user
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
            // initialiseNewUser(user.email)
            createCollectionIfNotExists(user.email)
            setLoad(false)
        }
    }, [user, loading])


    return (
        <SafeAreaView className="flex flex-col items-center justify-between h-full bg-backGround">
            {/* <View className="h[50px] w-full bg-green-500">
                <Text>hiS</Text>
            </View> */}
            <ScrollView className="w-full h-max" >
                {
                    loading
                        ?
                        <Loader />
                        :
                        <Taskbox
                            email={user.email} />
                }
            </ ScrollView>
            {/* <View className="h-[50px]">
                <TouchableOpacity>

                    {!taskModal ?

                        <Button
                            onPress={openTaskModal}
                            title="Open tasks"
                        />
                        :
                        <Button
                            onPress={closeTaskModal}
                            title="close tasks"
                        />
                    }
                </TouchableOpacity>
                <NewTodoModal
                    visible={taskModal}
                    email={user?.email}
                    handleClose={closeTaskModal}
                />
            </View> */}

        </SafeAreaView>
    )
}

export default Default

