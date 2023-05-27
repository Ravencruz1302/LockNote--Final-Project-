import React from 'react';
import { View, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { styles } from './Notes';
import * as eva from '@eva-design/eva';
import {useFonts} from 'expo-font';
import {colors} from './styles';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Layout, Icon } from '@ui-kitten/components';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Locknotes = (props) => {

    function unlockNote(index){
        Alert.alert(
            'Return Note to Main Menu',
            'Are you sure you want to return this note to your Main Menu?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let getBack = props.moveToLock[index];
                        let array = [getBack, ...props.notes];
                        props.setNotes(array);
                
                        let newArray = [...props.moveToLock];
                        newArray.splice(index, 1);
                        props.setMoveToLock(newArray);

                        AsyncStorage.setItem('storedNotes', JSON.stringify(array)).then(() => {
                            props.setNotes(array)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }

    function unlockAllNotes() {
        Alert.alert(
            'Return All Notes to Main Menu',
            'Are you sure you want to return all of your notes in Main Menu?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let unlockedNotes = [...props.moveToLock];
                        let notes = [...props.notes];
                        unlockedNotes.forEach((item, index) => {
                            notes.push(item)
                        })
                        props.setMoveToLock([]);
                        props.setNotes(unlockedNotes);

                        AsyncStorage.setItem('storedNotes', JSON.stringify(notes)).then(() => {
                            props.setNotes(notes)
                        }).catch(error => console.log(error))

                        AsyncStorage.setItem('lockedNotes', JSON.stringify([])).then(() => {
                            props.setMoveToBin([])
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }

    const {navigation} = props;
    return (
        <ScrollView style={style.background}>
            <View style={style.notesContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: 40}}>
                    <TouchableOpacity style={style.emptyButton} onPress={() => unlockAllNotes()}>
                        <Text style={style.emptyText}>Unlock All Notes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Notes')}>
                    <IconRegistry icons={EvaIconsPack} />
                    <ApplicationProvider {...eva} theme={eva.light}>
                        <Icon name='home-outline' fill="white" style={{width: 25, height: 45}} />
                    </ApplicationProvider>
                    </TouchableOpacity>

                </View>

                <View style={style.divider}></View>

                {props.moveToLock.length === 0
                ?
            
                <View style={styles.emptyNoteContainer}>
                 <Text style={styles.emptyNoteText}>Nothing to Show yet!</Text>
                </View>
                :
                
                props.moveToLock.map((item, index) => 

                    <View style={styles.item} key={index}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                            <View style={styles.note}>
                                <Text style={styles.index}></Text>
                                <Text style={styles.text}>{item}</Text>
                            </View>

                        </View>

                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{props.date}</Text>

                        <TouchableOpacity onPress={() => unlockNote(index)}>
                            <Text style={styles.unlocktext}>Unlock</Text>
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
        backgroundColor: '#F0E9D2',
        height: '100%',
    },
    notesContainer: {
        paddingTop:10,
        paddingHorizontal:20,
        opacity: 0.9,
        backgroundColor: '#F0E9D2',
        height: '100%',
    },

    divider:{
        width: '100%',
        height: 2,
        backgroundColor: colors.secondary,
        marginTop: 45,
        marginBottom: 5
    },

    emptyButton: {
        backgroundColor: '#181D31',
        width: '50%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        marginBottom: 5
    },
    emptyText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700'
    },
    notesContainer:{
        paddingTop:10,
        paddingHorizontal:20,
        marginBottom: 70,
        opacity: 0.9
    },
    button: {
        borderRadius: 30,
        backgroundColor: "#181D31",
        height: 30,
        shadowOffset: {width: 2, height: 50},
        elevation: 10,
        shadowColor: "",
        top: -90,
    },

    unlocktext: {
        color: colors.secondary,
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold'
    }

});
    
export default Locknotes;