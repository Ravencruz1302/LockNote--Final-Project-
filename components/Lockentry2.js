import * as React from 'react';
import {StyleSheet, View, TextInput, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import { ApplicationProvider, IconRegistry, Layout, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {baseUrl} from "../components/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const Lockentry2  = (props) => {
  const {navigation} = props;
  const [sixpinpwd, setSixpinpwd] = React.useState('');

  AsyncStorage.getItem("user_id");

  const onChangeSixpinpwdHandler = (sixpinpwd) => {
    setSixpinpwd(sixpinpwd);
  };

  const onSubmitFormHandler = async (event) => {
    if (!sixpinpwd.trim()) {
      alert("Input your Six PIN password");
      return;
    }
    user_id = await AsyncStorage.getItem("user_id");
    console.log(sixpinpwd, user_id)
    try {
      const response = await axios.post(`${baseUrl}lockentry2/${user_id}`, {
        // sixpinpwd: sixpinpwd,
        // users_id: user_id 
      });
      if (response.status === 200) {
        console.log(response.data.payload);
        alert("Lock 2 Login Successful!");
        setSixpinpwd("");
        
        if (sixpinpwd==response.data.payload[0].sixpinpwd){
            return navigation.navigate("Locknotes");
        } else {
          alert("Invalid 6 PIN Password");
        }
        
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("Invalid 6 PIN Password");
    }
  };

  return (
    <SafeAreaView style={styles.bg}>
    <View style={styles.container}>
      <View style={styles.passwordcontainer}>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={onChangeSixpinpwdHandler}
        underlineColorAndroid="transparent"
        placeholder="Enter your 6 PIN Password"
        keyboardType="number-pad"
        value={sixpinpwd}
      />
      </View>
      <View style={styles.btnview}>
      <TouchableOpacity onPress={onSubmitFormHandler} style={styles.button}>
        <Text style={styles.logintxt}>Enter</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.homebtnview}>
    <TouchableOpacity style={[styles.homebutton]} onPress={() => navigation.navigate('Notes')}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva. light}>
            <Icon name='home-outline' fill="white" style={{width: 25, height: 50}} />
        </ApplicationProvider>
    </TouchableOpacity>
    </View>

    </View>
    </SafeAreaView>
  );
}

export default Lockentry2;


const styles = StyleSheet.create({

  input: {
    height: 55,
    margin: 30,
    paddingLeft: 20,
    borderRadius: 30,
    top: 7,
    backgroundColor: '#FFFF',
    fontFamily: 'Roboto',
  },
  container: {
    height: '100%'
  },
  textcard: {
    backgroundColor:'#678983',
    top: 40,
    borderRadius: 30,
    height: 500,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    top: 20,
    color: 'black',
  },
  Logo: {
    top: 30,
    left: 55,
    height: 300,
    width: 250,
  },
  btnview: {
    width: 150,
    left: 105,
    borderRadius: 30,
    top: 290,
  },
  btnview1: {
    width: 200,
    left: 80,
    borderRadius: 30,
    top: 60,
  },
  button: {
    borderRadius: 30,
    backgroundColor: "#181D31",
    height: 50,
    shadowOffset: {width: 2, height: 50},
    elevation: 10,
    shadowColor: "",
    top: -90,
  },
  button1: {
    borderRadius: 30,
    backgroundColor: "#181D31",
    height: 50,
    shadowOffset: {width: 2, height: 50},
    elevation: 10,
    shadowColor: "",
    top: -50,
  },
  logintxt: {
    textAlign: "center",
    top: 15,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: 'white',
  },
  createTxt: {
    textAlign: "center",
    top: 15,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: 'white',
  },
  passwordcontainer: {
    top: 200
  },
  bg: {
    backgroundColor: '#E6DDC4',
  },
  homebutton: {
    backgroundColor: '#181D31',
    width:50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  homebtnview: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});