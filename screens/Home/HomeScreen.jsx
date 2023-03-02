import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { doc, setDoc, addDoc, collection, getDoc, Timestamp, getDocs } from "firebase/firestore";
import Taskbox from '../../components/Home/Taskbox';
import { Loader } from '../../components';
import NewTodoModal from '../../components/Modal/NewTodoModal';

const HomeScreen = () => {
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
        const collectionsRef = collection(db, 'user-todo');

        try {
            const querySnapshot = await getDocs(collectionsRef);
            const collectionExists = querySnapshot.docs.some(
                (doc) => doc.id === userEmail
            );

            if (!collectionExists) {
                const newCollectionRef = collection(db, 'user-todo', userEmail);
                await addDoc(newCollectionRef, { name: 'User Todo' });
                console.log(`Collection '${userEmail}' created successfully!`);
            } else {
                console.log(`Collection '${userEmail}' already exists.`);
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
            initialiseNewUser(user.email)
            setLoad(false)
            // createCollectionIfNotExists(user.email)
        }
    }, [user, loading])



    return (
        <SafeAreaView className="flex flex-col items-center justify-between h-full bg-backGround">
            {/* <Text className="text-white">hi {user?.email ? user.email : "No user"}</Text> */}
            <View className="h-max">
                {
                    loading
                        ?
                        <Loader />
                        :
                        <Taskbox
                            email={user.email} />
                }
            </View>
            <View className="h-[50px]">
                {/* <Text>Footer</Text> */}
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
                    handleClose={() => {
                        closeTaskModal()
                    }}
                />
            </View>



        </SafeAreaView>
    )
}

export default HomeScreen