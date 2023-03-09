import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from '../Loader/Loader'
import TaskCard from './TaskCard'

const Taskbox = ({ email }) => {
    const [user, loading, error] = useAuthState(auth)
    const Query = collection(db, email)
    const sortQ = query(Query, orderBy('createdAt', 'desc'))
    const [data, dLoad, dError] = useCollectionData(sortQ)
    const [refinedData, setRefinedData] = useState([])

    useEffect(() => {
        if (dLoad || !data) return
        const refData = data.filter(element => element?.description && element?.task)
        setRefinedData(refData)
    }, [data, dLoad])


    return (
        <View >
            {dLoad ?
                <Loader />
                :
                <View >
                    {/* <Text className="text-white">hi</Text> */}
                    {data && refinedData.map((doc, index) => {
                        return (
                            <View key={index} className="flex flex-col p-1.5">
                                <TaskCard
                                    createdAt={doc.createdAt}
                                    title={doc.task}
                                    description={doc.description}
                                />
                                {/* <Text className="text-cyan-300">{doc.task}</Text>
                                    <Text className="text-cyan-300">{doc.description}</Text>
                                    <Text className="text-cyan-300">{moment(doc?.createdAt.toDate()).fromNow()}</Text> */}
                            </View>
                        )
                    })}
                    {/* {taskSnapshot && taskSnapshot?.map((doc) => {
                            return (
                                <View key={doc?.id}>
                                    <Text>{doc?.title}</Text>
                                    <Text>{doc?.description}</Text>
                                </View>
                            )
                        })} */}
                </View>
            }
        </View>
    )
}

export default Taskbox