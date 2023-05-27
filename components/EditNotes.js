import React, {useState} from 'react';
import {ScrollView, View, Text, Keyboard, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {styles} from './AddNote';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditNotes = ({route, navigation, ...props}) => {
    const {i, n} = route.params;
    const [newEdit, setNewEdit] = useState(n);

    function EditNotes() {
        let edited = [...props.notes];
        edited[i] = newEdit;
        props.setNotes(edited);

        navigation.navigate('Notes');

        AsyncStorage.setItem('storedNotes', JSON.stringify(edited)).then(() => {
            props.SetNotes(edited)
        }).catch(error => console.log(error))
    }

    return (
        <ScrollView style={[styles.addNoteContainer]}>
            <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={{top: 60, height: 500}}>

                <View style={{padding: 20, justifyContent: 'space-around'}}>
                    <TextInput style={[styles.input]} placeholder='Type Here'
                    value={newEdit.toString()} onChangeText={(text) => setNewEdit(text)}></TextInput>

                    <TouchableOpacity style={styles.button} onPress={() => EditNotes()}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>

                </View>
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>

        
    )
}

export default EditNotes;