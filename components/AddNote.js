import React from 'react';
import { Text, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, View, TextInput } from 'react-native';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { TouchableOpacity } from 'react-native';
import { ApplicationProvider, IconRegistry, Layout, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {useFonts} from 'expo-font';
import {colors} from './styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

const AddNote = ({navigation, ...props}) => {
    return (
     <ScrollView style={styles.addNoteContainer}>
            <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={{top: 60, height: 500}}>

                <TouchableOpacity style={[styles.homebutton]} onPress={() => navigation.navigate('Notes')}>
                    <IconRegistry icons={EvaIconsPack} />
                    <ApplicationProvider {...eva} theme={eva. light}>
                        <Icon name='home-outline' fill="white" style={{width: 25, height: 25}} />
                    </ApplicationProvider>
                    </TouchableOpacity>

                    <TextInput style={[styles.input]} placeholder='Type Here' 
                    multiline={true} 
                    value={props.note} onChangeText={(text) => props.setNote(text)}/>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        if(props.note === '') {
                            Alert.alert('Please put some input or Type Something.');
                        }else{
                            props.handleNote();
                            navigation.navigate('Notes')
                        }
                    } }>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export const styles = StyleSheet.create({
    addNoteContainer: {
        paddingHorizontal: 20,
        backgroundColor: '#F0E9D2',
        height: '100%',
    },
    input: {
        fontSize: 19,
        color: 'black',
        fontWeight: '600',
        opacity: 0.8,
        shadowColor: '#181D31',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: '#181D31',
        borderWidth: 2,
        borderRadius: 5,
        height: 250,
        padding: 20,
        fontFamily: 'Montserrat-Regular',
        top: 10,
    },
    homebutton: {
        backgroundColor: colors.secondary,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#181D31',
        width: '40%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold'
    }
     

 
});
export default AddNote;