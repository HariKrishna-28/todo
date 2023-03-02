import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { collection, doc, getDoc } from 'firebase/firestore'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import Loader from '../Loader/Loader'

const Taskbox = ({ email }) => {
    const [user, loading, error] = useAuthState(auth)
    const userTodoDocRef = doc(db, 'user-todo', email);
    const [taskSnapshot, tLoad, tError] = useDocument(userTodoDocRef)
    // const [docLength, setDocLength] = useState(0)


    // const getDocLength = async (docSnap) => {
    //     try {
    //         if (docSnap.exists()) {
    //             const numFields = Object.keys(docSnap.data()).length;
    //             setDocLength(numFields)
    //             console.log(numFields)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {

        if (tLoad) return
        console.log(taskSnapshot.data())
        // if (taskSnapshot) {
        //     // getDocLength(taskSnapshot)
        //     // const numDocs = taskSnapshot.size
        //     // console.log(numDocs)
        // }
    }, [taskSnapshot, tLoad])


    return (
        <View>
            <Text>
                {tLoad ?
                    <Loader />
                    :
                    <View>
                        <Text className="text-white">hi</Text>
                    </View>
                    // taskSnapshot.data().map((task, index) => {
                    //     return (
                    //         <View>
                    //             <Text>{task.title}</Text>
                    //             <Text>{task.description}</Text>
                    //             {/* <Text>{</Text> */}
                    //         </View>
                    //     )
                    // })
                }
            </Text>
        </View>
    )
}

export default Taskbox