import { View, Text } from 'react-native'
import React from 'react'
import moment from 'moment'

const TaskCard = ({ title, description, createdAt }) => {
    return (
        <View className="w-full p-3 rounded bg-secondaryBackground">
            <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-2xl font-bold text-textColour">{title}</Text>
                <Text className="text-sm text-blue-500">{moment(createdAt?.toDate()).fromNow()}</Text>
            </View>
            <Text className="text-textColour">{description}</Text>
        </View>
    )
}

export default TaskCard