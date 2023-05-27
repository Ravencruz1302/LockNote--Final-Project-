import * as React from 'react';
import {StyleSheet, View, TextInput, Text, SafeAreaView, Image, TouchableOpacity, ScrollView} from 'react-native';
import {useFonts} from 'expo-font';
import {colors} from './styles';
import axios from "axios";
import {baseUrl} from "../components/url";
// const baseUrl = "http://192.168.0.106/LockNote/api/";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Login  = (props) => {
  const {navigation} = props;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChangeUsernameHandler = (username) => {
    setUsername(username);
  };

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onSubmitFormHandler = async (event) => {
    if (!username.trim() || !password.trim()) {
      alert("Input your Username and Password!");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}login`, {
        username,
        password,
      });
      if (response.status === 200) {
        // console.log(response.data.payload);
        alert("Account Login Successful!");
        setUsername("");
        setPassword("");

        storeData = async () => {
          try {
            await AsyncStorage.setItem(
              "user_id",
              JSON.stringify(response.data.payload.user_id)
            );
            await AsyncStorage.setItem(
              "username",
              response.data.payload.username
            );
            await AsyncStorage.setItem("token", response.data.payload.token);
          } catch (error) {
            // Error saving data
          }
        };
        storeData();
        return navigation.navigate("Notes");
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("Invalid Username or Password!");
    }
  };

  return (
    <SafeAreaView style={styles.bg}>
    <ScrollView style={styles.container}>
      <Image
        style={styles.Logo}
        source={require('../assets/LockNote.png')}
      />
    
    <Text style={styles.title}> Store your Secrets in a note with LockNote </Text>
    <View style={styles.textcard}>
      <View style={styles.usercontainer}>

      <TextInput
        style={styles.input}
        onChangeText={onChangeUsernameHandler}
        underlineColorAndroid="transparent"
        placeholder="Username"
        value={username}
      />
      </View>
      <View style={styles.passwordcontainer}>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={onChangePasswordHandler}
        underlineColorAndroid="transparent"
        placeholder="Password"
        value={password}
      />
      </View>
      <View style={styles.btnview}>
      <TouchableOpacity onPress={onSubmitFormHandler} style={styles.button}>
        <Text style={styles.logintxt}>Login</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.btnview1}>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.button1}>
        <Text style={styles.createTxt}>Create Account</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 55,
    margin: 30,
    paddingLeft: 20,
    borderRadius: 30,
    top: 7,
    backgroundColor: '#FFFF',
    fontFamily: 'Montserrat-Light',
  },
  textcard: {
    backgroundColor: colors.card,
    top: 40,
    borderRadius: 30,
    height: 500,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    top: 20,
    color: 'black',
  },
  Logo: {
    top: 30,
    alignSelf: 'center',
    height: 300,
    width: 250,
  },
  btnview: {
    width: 150,
    alignSelf: 'center',
    borderRadius: 30,
    top: 35,
  },
  btnview1: {
    width: 200,
    alignSelf: 'center',
    borderRadius: 30,
    top: 60,
  },
  button: {
    borderRadius: 30,
    backgroundColor: colors.secondary,
    height: 50,
    shadowOffset: {width: 2, height: 50},
    elevation: 10,
    shadowColor: "",
    top: -90,
  },
  button1: {
    borderRadius: 30,
    backgroundColor: colors.secondary,
    height: 50,
    shadowOffset: {width: 2, height: 50},
    elevation: 10,
    shadowColor: "",
    top: -50,
  },
  logintxt: {
    textAlign: "center",
    top: 15,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  createTxt: {
    textAlign: "center",
    top: 15,
    fontFamily: "Montserrat-Bold",
    color: 'white',
  },
  passwordcontainer: {
    top: -50,
  },
  bg: {
    backgroundColor: '#E6DDC4',
  },
});