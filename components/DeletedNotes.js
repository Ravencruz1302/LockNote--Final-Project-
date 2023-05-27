import React from 'react';
import { View, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ApplicationProvider, IconRegistry, Layout, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { styles } from './Notes';
import {useFonts} from 'expo-font';
import {colors} from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeletedNotes = ({navigation, ...props}) => {

    function undoAllNotes() {
        let deletedNotes = [...props.moveToBin];
        let notes = [...props.notes];
        deletedNotes.forEach((item, index) => {
            notes.push(item)
        })
        props.setMoveToBin([]);
        props.setNotes(deletedNotes);

        AsyncStorage.setItem('storedNotes', JSON.stringify(notes)).then(() => {
            props.setNotes(notes)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('DeletedNotes', JSON.stringify([])).then(() => {
            props.setMoveToBin([])
        }).catch(error => console.log(error))
    }

    function emptyBin(){
        Alert.alert(
            'Delete All',
            'Are you sure you want to permanently delete all Notes?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let emptyArray = [...props.moveToBin];
                        emptyArray = [];
                        props.setMoveToBin(emptyArray);
                        
                        AsyncStorage.setItem('deletedNotes', JSON.stringify(emptyArray)).then(() => {
                            props.setMoveToBin(emptyArray)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }

    function undoNote(index) {
        Alert.alert(
            'Return Note to Main Menu',
            'Are you sure you want to Return this Note to your Main Menu?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let getBack = props.moveToBin[index];
                        let array = [getBack, ...props.notes];
                        props.setNotes(array);
                
                        let newArray = [...props.moveToBin];
                        newArray.splice(index, 1);
                        props.setMoveToBin(newArray);
                
                        AsyncStorage.setItem('storedNotes', JSON.stringify(array)).then(() => {
                            props.setNotes(array)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }

    function permanentlyDelete(index) {
        Alert.alert(
            'Delete',
            'Are you sure you want to permanently delete this note?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let newArray = [...props.moveToBin];
                        newArray.splice(index, 1);
                        props.setMoveToBin(newArray);

                        AsyncStorage.setItem('DeletedNotes', JSON.stringify(newArray)).then(() => {
                            props.setMoveToBin(newArray)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }

    return (
        <ScrollView style={style.background}>
            <View style={[style.notesContainer]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                    <TouchableOpacity style={style.emptyButton} onPress={() => undoAllNotes()}>
                        <Text style={style.emptyText}>Undo All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Notes')}>
                    <IconRegistry icons={EvaIconsPack} />
                    <ApplicationProvider {...eva} theme={eva. light}>
                        <Icon name='home-outline' fill="white" style={{width: 25, height: 25}} />
                    </ApplicationProvider>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.emptyButton} onPress={() => emptyBin()}>
                        <Text style={style.emptyText}>Empty</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.divider}></View>

                {props.moveToBin.length === 0
                ?
            
                <View style={styles.emptyNoteContainer}>
                 <Text style={styles.emptyNoteText}>Nothing to Show yet!</Text>
                </View>
                :
                
                props.moveToBin.map((item, index) => 

                    <View style={styles.item} key={index}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                            <View style={styles.note}>
                                <Text style={styles.index}></Text>
                                <Text style={styles.text}>{item}</Text>
                            </View>

                            <TouchableOpacity onPress={() => undoNote(index)}>
                                <Text style={styles.delete}>Undo</Text>
                            </TouchableOpacity>
                        </View>
                    

                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{props.date} </Text>

                        <TouchableOpacity>
                            <Text style={styles.delete} onPress={() => permanentlyDelete(index)}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
            </View>
        </ScrollView>
    )
}


export const style = StyleSheet.create({
    background: {
        backgroundColor: colors.background,
        height: '100%',
    },
    emptyButton: {
        backgroundColor: colors.secondary,
        width: '30%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginBottom: 5
    },
    emptyText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold'
    },
    notesContainer:{
        paddingTop:10,
        paddingHorizontal:20,
        marginBottom: 70,
        opacity: 0.9,
        top: 30
    },
    dateText: {
        fontSize: 10,
    },
});
    
export default DeletedNotes;