import React, { useState,useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground , TouchableOpacity, Image, Modal} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const Login = ({ navigation }: { navigation: NavigationProp<any> }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic for handling login goes here
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('AppTabsBeginningPlayer');
  };

  return (
  <View style={styles.container}>
        <ImageBackground
            source={require('../../../assets/images/mainscreen.png')}
            style={styles.background}>
      <View style={styles.square}>
        <Text style={styles.tex}>LOG IN</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin} style={styles.Button}>
          <Text  style={styles.ButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex : 1,
    width: '100%',
    resizeMode: 'contain',
    justifyContent:'center',
  },
  container: {
    flex: 1,                 
    justifyContent: 'center', 
    alignItems: 'center',
    alignContent : 'center' ,
  },
  tex : {
      fontSize: 30,

  },
  input: {
    height: 40,
    width : 300,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    paddingHorizontal: 8,

  },
   ButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    width: '95%',

    
    alignItems: 'center',
    alignSelf: 'center',

   },
   popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
},
popupImage: {
    width: 400,
    height: 800,
},
square: {
  width: 350,  // Set the width of the square
  height: 350, // Set the height of the square (same as width)
  backgroundColor : 'white',
  justifyContent: 'center',     // Optional: Center content vertically
  alignItems: 'center',  
  alignSelf: 'center',
  borderRadius: 20,       // Optional: Center content horizontally
},
});

export default Login;