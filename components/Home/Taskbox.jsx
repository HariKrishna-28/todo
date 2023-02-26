import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { collection, doc, getDoc } from 'firebase/firestore'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import Loader from '../Loader/Loader'

const Taskbox = ({ email }) => {
    const [user, loading, error] = useAuthState(auth)
    const userTodoDocRef = doc(db, 'user-todo', email);
    const [taskSnapshot, tLoad, tError] = useDocument(userTodoDocRef)

    return (
        <View>
            <Text>
                {tLoad ?
                    <Loader />
                    :
                    taskSnapshot.data.length == 0 ?
                        <Text className="text-white">Empty </Text>
                        : <Text className="text-white">Innah thaley </Text>
                }
            </Text>
        </View>
    )
}

export default Taskbox