import React, {useState} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, FlatList, Alert, Keyboard } from 'react-native';
import { ApplicationProvider, IconRegistry, Layout, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ScrollView } from 'react-native';
import {useFonts} from 'expo-font';
import {colors} from './styles';
import {baseUrl} from "../components/url";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Notes = ({navigation, ...props}) => {

    const [searchNote, setSearchNote] = useState();

    function DeletedNotes(index){
        Alert.alert(
            'Delete Note',
            'Are you sure you want to Delete this Note?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let newArray = [...props.notes];
                        let movedNote = newArray.splice(index, 1);
                        props.setNotes(newArray);
                        props.setMoveToBin(movedNote);

                        let bin = [movedNote, ...props.moveToBin];
                        props.setMoveToBin(bin);

                        AsyncStorage.setItem('storedNotes', JSON.stringify(newArray)).then(() => {
                            props.SetNotes(newArray)
                        }).catch(error => console.log(error))

                        AsyncStorage.setItem('DeletedNotes', JSON.stringify(bin)).then(() => {
                            props.setMoveToBin(bin)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }

    function LockedNotes(index){
        Alert.alert(
            'Store Note on Lock Section',
            'Are you sure you want to put your Note on the secret stash?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let newArray = [...props.notes];
                        let movedNote = newArray.splice(index, 1);
                        props.setNotes(newArray);
                        props.setMoveToBin(movedNote);

                        let lock = [movedNote, ...props.moveToLock];
                        props.setMoveToLock(lock);

                        AsyncStorage.setItem('storedNotes', JSON.stringify(newArray)).then(() => {
                            props.SetNotes(newArray)
                        }).catch(error => console.log(error))

                        AsyncStorage.setItem('lockedNotes', JSON.stringify(lock)).then(() => {
                            props.setMoveToLock(lock)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }

    function search(){
        if(searchNote === ''){
            Alert.alert('Type something in the search box.');
        }else if(searchNote !== ''){
            props.notes.forEach((item, index) => {
                if(item.includes(searchNote)){
                    let searchItem = [...props.notes];
                    let firstElOfArray = searchItem[0];
                    let index = [...props.notes].indexOf(item);
                    searchItem[0] = item;
                    searchItem[index] = firstElOfArray;
                    props.setNotes(searchItem);
                }
            })
        }
        setSearchNote('');

        Keyboard.dismiss();
    }

    function clearAllNotes(){
        Alert.alert(
            'Delete All Notes',
            'Are you sure you want to Delete All of your Notes?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let emptyArray = [...props.notes];
                        let deletedCompArray = [...props.moveToBin];
                        emptyArray.forEach((item, index) => {
                            deletedCompArray.push(item);
                        })
                        emptyArray = [];
                        props.setNotes(emptyArray);
                        props.setMoveToBin(deletedCompArray);

                        AsyncStorage.setItem('storedNotes', JSON.stringify(emptyArray)).then(() => {
                            props.SetNotes(emptyArray)
                        }).catch(error => console.log(error))

                        AsyncStorage.setItem('deletedNotes', JSON.stringify(deletedCompArray)).then(() => {
                            props.setMoveToBin(deletedCompArray)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
    }

    return (
        <View style={[styles.notesContainer]}>
        
        <View style={styles.notecontents}>
            <View style={styles.headingContainer}>

            <Text style={styles.heading}> Your {"\n"} Notes</Text>

                <View style={{flexDirection: 'row'}}>

                    <TouchableOpacity style={[styles.button, {marginLeft: 10}]} onPress={() => navigation.navigate('DeletedNotes')}>
                    <IconRegistry icons={EvaIconsPack} />
                    <ApplicationProvider {...eva} theme={eva. light}>
                        <Icon name='trash-2-outline' fill="white" style={{width: 25, height: 50}} />
                    </ApplicationProvider>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('AddNote')}>
                    <IconRegistry icons={EvaIconsPack} />
                    <ApplicationProvider {...eva} theme={eva. light}>
                        <Icon name='plus-outline' fill="white" style={{width: 25, height: 50}} />
                    </ApplicationProvider>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Lockentry1')}>
                    <IconRegistry icons={EvaIconsPack} />
                    <ApplicationProvider {...eva} theme={eva. light}>
                        <Icon name='lock-outline' fill="white" style={{width: 25, height: 50}} />
                    </ApplicationProvider>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Logout')}>
                    <IconRegistry icons={EvaIconsPack} />
                    <ApplicationProvider {...eva} theme={eva. light}>
                        <Icon name='log-out-outline' fill="white" style={{width: 25, height: 50}} />
                    </ApplicationProvider>
                    </TouchableOpacity>
                    
                </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            </View>

            <View style={styles.divider}></View>

            

            <View style={styles.searchContainer}>
                <TextInput placeholder='Search' placeholderTextColor={'#181D31'} style={[styles.input, {borderWidth: 3}]} 
                value ={searchNote} onChangeText={(text) => setSearchNote(text)}/>
                

                <TouchableOpacity style={[styles.searchButton, {width: 50}]} onPress={() => search()}>
                <IconRegistry icons={EvaIconsPack} />
                    <ApplicationProvider {...eva} theme={eva. light}>
                        <Icon name='search' fill="white" style={{width: 25, height: 50}} />
                    </ApplicationProvider>
                </TouchableOpacity>

                <TouchableOpacity style={styles.searchButton} onPress={() => clearAllNotes()}>
                    <Text style={styles.searchButtonText}>Clear</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                {props.notes.length === 0
                ?
                <View style={styles.emptyNoteContainer}>
                    <Text style={styles.emptyNoteText}>You haven't add any notes yet! If you want to add or create one. Press the + plus button.</Text>
                </View>
                :
                
                props.notes.map((item, index) => 

                    <View style={styles.item} key={index}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                        <View style={styles.note}>
                            <Text style={styles.index}></Text>
                            <Text style={styles.text}>{item}</Text>
                        </View>

                        <TouchableOpacity onPress={() => DeletedNotes(index)}>
                            <Text style={styles.delete}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{props.date}</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('EditNotes' , {
                            i: index,
                            n: item
                        })}>
                            <Text style={styles.edit}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => LockedNotes(index)}>
                            <Text style={styles.lock}>Lock</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )} 
            </ScrollView>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    notesContainer:{
        paddingTop:10,
        paddingHorizontal:20,
        marginBottom: 70,
        opacity: 0.9,
        backgroundColor: colors.background,
        height: '100%'
    },
    notecontents: {
        top: 40
    },
    heading:{
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
        color: colors.secondary,
    },

    divider:{
        width: '100%',
        height:2,
        backgroundColor: colors.secondary,
        marginTop: 5,
        marginBottom: 5
    },

    dateText: {
        fontSize: 10,
    },

    item:{
        marginBottom: 20,
        marginTop: 10,
        padding: 15,
        color: 'block',
        opacity: 0.8,
        shadowColor: colors.secondary,
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
        borderLeftWidth: 15,
    },

    index: {
        fontSize: 20,
        fontWeight:'800',
    },

    headingContainer: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    
    button: {
        backgroundColor: colors.secondary,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
        height: 50
    },

    buttonText: {
        color:'white',
        fontWeight:'800',
        fontSize: 32
    },

    scrollView: {
        marginBottom: 70
    },

    note: {
        flexDirection:'row',
        width: '75%',
    },

    text: {
        fontWeight:'700',
        fontSize: 17,
        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular'
    },

    edit: {
        color: colors.secondary,
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
    },

    lock: {
        color: colors.secondary,
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
    },

    delete: {
        color: colors.secondary,
        fontSize: 15,
        fontFamily: 'Montserrat-Bold'
    },

    input:{
        height: 40,
        paddingHorizontal: 20,
        width: '65%',
        fontSize: 19,
        color: 'black',
        fontWeight: '600',
        opacity: 0.8,
        elevation: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.secondary,
        backgroundColor: 'white',
        fontFamily: 'Montserrat-Regular'
    },

    searchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8
    },

    searchButton:{
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        borderRadius: 5,
        height: 40
    },

    searchButtonText:{
        color:'white',
        fontWeight:'700',
        fontSize: 12,
        fontFamily: 'Montserrat-Regular'
    },

    emptyNoteContainer:{
        alignItems: 'center',
        marginTop: 240
    },

    emptyNoteText:{
        color:colors.secondary,
        fontWeight:'600',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular'
    },    

    dateContainer:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        fontFamily: 'Montserrat-Regular'
    },

    unlocktext: {
        color: colors.secondary,
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold'
    }
})

export default Notes;
