import * as React from 'react';
import {StyleSheet, View, Alert, TextInput, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';


const Logout  = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.bg}>
    <View style={styles.container}>
      <Image
        style={styles.Logo}
        source={require('../assets/Logout.png')}
      />
    <Text style={styles.logouttext}> LOG OUT SCREEN </Text>
    <View style={styles.logoutbtnview}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.logoutbutton}> 
        <Text style={styles.logoutbtntext}> LOG OUT </Text> 
      </TouchableOpacity>
    </View>
    </View>
    </SafeAreaView>
  );
}

export default Logout;

const styles = StyleSheet.create({
  container: {
    height: null,
    width: null,
  },
  Logo: {
    top: 50,
    left: 35,
    height: 400,
    width: 300,
  },
  logouttext: {
    top: 30,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  logoutbtnview: {
    top: 50,
    alignItems: 'center',
  },
  logoutbutton: {
    backgroundColor: "#993a3a",
    height: 100,
    width: 300,
    borderRadius: 10,
  },
  logoutbtntext: {
    fontSize: 50,
    textAlign: 'center',
    top: 10,
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  bg: {
    backgroundColor: '#E6DDC4',
    height: 1000,
  }
});