import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckIcon } from "react-native-heroicons/solid";
import { doc, setDoc, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase';

const NewTodoModal = ({ visible, handleClose, email }) => {
    const [task, setTask] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())
    // const [progress, setProgress] = useState("")


    const handleNewTask = async () => {
        try {
            const data = {
                task: task,
                description: description,
                createdAt: serverTimestamp(),
            }
            const docRef = collection(db, email)
            addDoc(docRef, data)
                .then(() => console.log("written"))
                .catch((error) => console.error(error))
                .finally(() => handleClose())

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <SafeAreaView style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    handleClose()
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView} >
                        <Text style={styles.modalText}>New Task</Text>

                        <View className="flex flex-col w-full gap-2 mb-2">
                            <TextInput
                                className="w-[280] p-3 text-white rounded-sm bg-backGround"
                                onChangeText={text => setTask(text)}
                                placeholderTextColor="grey"
                                placeholder="Title"
                            />
                            <TextInput
                                className="p-3 text-white rounded-sm bg-backGround"
                                onChangeText={text => setDescription(text)}
                                placeholderTextColor="grey"
                                placeholder="Description"
                                multiline={true}
                                numberOfLines={4}
                            />

                        </View>

                        <View className="flex flex-row items-center justify-between gap-3">
                            <TouchableOpacity>
                                <Button
                                    onPress={handleNewTask}
                                    disabled={!task && !description}
                                    title="Add"
                                />
                            </TouchableOpacity>
                            {/* <Pressable
                                disabled={!task && !description}
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => handleClose()}>
                                <Text style={styles.textStyle}>Add</Text>
                            </Pressable> */}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => handleClose()}>
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>
            {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => handleClose()}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable> */}

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#181B21',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#2196F3',
        width: 100
    },
    buttonClose: {
        backgroundColor: 'red',
        width: 100
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white'
    },
});
export default NewTodoModal