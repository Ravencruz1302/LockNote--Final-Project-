import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useFonts} from 'expo-font';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import DeletedNotes from './components/DeletedNotes';
import Login from './components/Login';
import Locknotes from './components/Locknotes';
import Lockentry1 from './components/Lockentry1';
import Lockentry2 from './components/Lockentry2';
import Signup from './components/Signup';
import Logout from './components/Logout';
import EditNotes from './components/EditNotes';
import {colors} from './components/styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseUrl = "http://192.168.0.107/LockNote/api/";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {

  const [note, setNote] = useState();
  const [notes, setNotes] = useState([]);
  const [date, setDate] = useState(new Date().toUTCString());
  const [moveToBin, setMoveToBin] = useState([]);
  const [moveToLock, setMoveToLock] = useState([]);

  function handleNote(){
    let newNote = note;
    let newNotes = [newNote, ...notes];
    setNotes(newNotes);
    setNote('');

    AsyncStorage.setItem('storedNotes', JSON.stringify(newNotes)).then(() => {
      setNotes(newNotes)
    }).catch(error=> console.log(error))

    AsyncStorage.setItem('date', JSON.stringify(date)).then(() => {
      setDate(date);
    })
  }

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () =>  {
    AsyncStorage.getItem('storedNotes').then(data => {
      if (data !== null) {
        setNotes(JSON.parse(data));
      }
    }).catch((error) => console.log(error))

    AsyncStorage.getItem('deletedNotes').then(data => {
      if (data !== null) {
        setMoveToBin(JSON.parse(data));
      }
    }).catch((error) => console.log(error))

    AsyncStorage.getItem('date');
  }

  let [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>

        <Stack.Screen name='Login'>
        {props => <Login {...props}/>}
        </Stack.Screen>

        
        <Stack.Screen name='Signup'>
        {props => <Signup {...props}/>}
        </Stack.Screen>

        <Stack.Screen name='Notes'>
          {props => <Notes {...props} notes={notes} moveToBin={moveToBin} setMoveToBin={setMoveToBin} moveToLock={moveToLock} setMoveToLock={setMoveToLock} setNotes={setNotes} note={note} setNote={setNote} date={date} setDate={setDate}/>}
        </Stack.Screen>

        <Stack.Screen name='AddNote'>
          {props => <AddNote {...props} note={note} setNote={setNote} handleNote={handleNote}/>}
        </Stack.Screen>

        <Stack.Screen name='DeletedNotes'>
          {props => <DeletedNotes {...props} moveToBin={moveToBin} setMoveToBin={setMoveToBin} notes={notes} setNotes={setNotes} date={date} setDate={setDate}/>}
        </Stack.Screen>

        <Stack.Screen name='EditNotes'>
          {props => <EditNotes {...props} notes={notes} setNotes={setNotes}/>}
        </Stack.Screen>

        <Stack.Screen name='Lockentry1'>
          {props => <Lockentry1 {...props}/>}
        </Stack.Screen>

        <Stack.Screen name='Lockentry2'>
          {props => <Lockentry2 {...props}/>}
        </Stack.Screen>

        <Stack.Screen name='Locknotes'>
          {props => <Locknotes {...props} moveToLock={moveToLock} setMoveToLock={setMoveToLock} notes={notes} setNotes={setNotes} date={date}/>}
        </Stack.Screen>

        <Stack.Screen name='Logout'>
          {props => <Logout {...props}/>}
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
