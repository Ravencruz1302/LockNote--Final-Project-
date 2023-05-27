import * as React from 'react';
import {StyleSheet, View, Alert, TextInput, Text, SafeAreaView, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import {useFonts} from 'expo-font';
import {colors} from './styles';
import axios from "axios";
import {baseUrl} from "../components/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup  = (props) => {
  const {navigation} = props;
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fourpinpwd, setFourpinpwd] = React.useState("");
  const [sixpinpwd, setSixpinpwd] = React.useState("");

  const onChangeUsernameHandler = (username) => {
    setUsername(username);
  };

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onChangeFourpinpwdHandler = (fourpinpwd) => {
    setFourpinpwd(fourpinpwd);
  };

  const onChangeSixpinpwdHandler = (sixpinpwd) => {
    setSixpinpwd(sixpinpwd);
  };

  const onSubmitFormHandler = async (event) => {
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !fourpinpwd.trim() ||
      !sixpinpwd.trim()
    ) {
      alert("Please provide all information!");
      return;
    } else if (password.length < 8) {
      alert("Password should be at least 8 characters!");
      return;
    } else {
      
       if (fourpinpwd.length < 4) {
        alert("4 PIN should be at least 4 Digits Only!");
        return;
      }
      else if (sixpinpwd.length < 6) {
        alert("6 PIN should be at least 6 Digits Only!");
        return;
      }

      try {
        const response = await axios.post(`${baseUrl}register`, {
          username,
          email,
          password,
          fourpinpwd,
          sixpinpwd,
        });
        if (response.status === 200) {
          alert(`You have succesfully created an account!`);
          setUsername("");
          setEmail("");
          setPassword("");
          setFourpinpwd("");
          setSixpinpwd("");
          return navigation.navigate("Login");
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        alert(error);
      }
    }
  };
  
  return (
    <SafeAreaView style={styles.bg}>
    <ScrollView style={styles.container}>  
    <Image
        style={styles.Logo}
        source={require('../assets/Create_account.png')}
      />
    <View style={styles.textcard}>
      <View style={styles.usercontainer}>
      <Text style={styles.title}> CREATE ACCOUNT </Text>
      <TextInput
        caretHidden={true}
        style={styles.input}
        onChangeText={onChangeUsernameHandler}
        underlineColorAndroid="transparent"
        placeholder="Username"
        value={username}
      />
      </View>
      <View style={styles.emailcontainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmailHandler}
        underlineColorAndroid="transparent"
        placeholder="Email"
        value={email}
      />
      </View>
      <View style={styles.passwordcontainer}>
      <TextInput
        caretHidden={true}
        secureTextEntry={true}
        style={styles.input}
        onChangeText={onChangePasswordHandler}
        underlineColorAndroid="transparent"
        placeholder="Password"
        value={password}
      />
      </View>
      <View style={styles.fourpincontainer}>
      <TextInput
        caretHidden={true}
        secureTextEntry={true}
        style={styles.input}
        onChangeText={onChangeFourpinpwdHandler}
        underlineColorAndroid="transparent"
        placeholder="4 PIN Password"
        keyboardType="number-pad"
        value={fourpinpwd}
      />
      </View>
      <View style={styles.sixpincontainer}>
      <TextInput
        caretHidden={true}
        secureTextEntry={true}
        style={styles.input}
        onChangeText={onChangeSixpinpwdHandler}
        underlineColorAndroid="transparent"
        placeholder="6 PIN Password"
        keyboardType="number-pad"
        value={sixpinpwd}
      />
      </View>
      <View style={styles.btnview}>
      <TouchableOpacity onPress={onSubmitFormHandler} style={styles.button}>
        <Text style={styles.logintxt}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.btnview1}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button1}>
        <Text style={styles.createTxt}>Back To Log In</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

export default Signup;

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: 30,
    paddingLeft: 20,
    borderRadius: 30,
    top: 7,
    backgroundColor: '#FFFF',
    fontFamily: 'Montserrat-Light',
  },
  textcard: {
    backgroundColor: colors.card,
    top: 10,
    borderRadius: 30,
    height: 700,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    top: 15,
    color: 'white',
  },
  Logo: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 200,
    width: 200,
  },
  btnview: {
    width: 150,
    alignSelf: 'center',
    borderRadius: 30,
    top: -60,
  },
  btnview1: {
    width: 200,
    alignSelf: 'center',
    borderRadius: 30,
    top: -50,
  },
  button: {
    borderRadius: 30,
    backgroundColor: "#181D31",
    height: 50,
    shadowOffset: {width: 2, height: 50},
    elevation: 10,
    shadowColor: "",
    top: -140,
  },
  button1: {
    borderRadius: 30,
    backgroundColor: "#181D31",
    height: 50,
    shadowOffset: {width: 2, height: 50},
    elevation: 10,
    shadowColor: "",
    top: -90,
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
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  emailcontainer: {
    top: -50,
  },
  passwordcontainer: {
    top: -100,
  },
  fourpincontainer: {
    top: -150,
  },
  sixpincontainer: {
    top: -200,
  },
  bg: {
    backgroundColor: '#E6DDC4',
  },
});