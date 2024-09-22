import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const PlayerSignup = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [playertype, setPlayertype] = useState('Batsman');
  const [role, setRole] = useState('None');
  const [bowlingtype, setBowlingtype] = useState('Left Arm Off Spin');

  const handleLogin = () => {
    // Logic for handling login goes here
    console.log('Firstname:', firstname);
    console.log('Lastname:', lastname);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Playertype:', playertype);
    console.log('Role:', role);
    console.log('Bowlingtype:', bowlingtype);
    navigation.navigate('LoginPagePlayer');
  };

  return (
    <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/images/mainscreen.png')}
          style={styles.background}>

        <View style={styles.square}>
          <Text style={styles.tex}>SIGN UP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            placeholderTextColor="#ccc"
            value={firstname}
            onChangeText={setFirstname}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            placeholderTextColor="#ccc"
            value={lastname}
            onChangeText={setLastname}
          />
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
          <Picker
            selectedValue={playertype}
            style={styles.picker}
            onValueChange={(itemValue) => setPlayertype(itemValue)}
          >
            <Picker.Item label="Batsman" value="Batsman" />
            <Picker.Item label="Bowler" value="Bowler" />
            <Picker.Item label="Allrounder" value="Allrounder" />
            <Picker.Item label="Wicket Keeper" value="WicketKeeper" />
          </Picker>
          <Picker
            selectedValue={role}
            style={styles.picker}
            onValueChange={(itemValue) => setRole(itemValue)}
          >
            <Picker.Item label="None" value="None" />
            <Picker.Item label="Captain" value="Captain" />
          </Picker>
          <Picker
            selectedValue={bowlingtype}
            style={styles.picker}
            onValueChange={(itemValue) => setBowlingtype(itemValue)}
          >
            <Picker.Item label="Left Arm Off Spin" value="LeftArmOffSpin" />
            <Picker.Item label="Left Arm Medium Fast" value="LeftArmMediumFast" />
            <Picker.Item label="Right Arm Off Spin" value="RightArmOffSpin" />
            <Picker.Item label="Right Arm Medium Fast" value="RightArmMediumFast" />
            {/* Add other bowling types as needed */}
          </Picker>
          <TouchableOpacity onPress={handleLogin} style={styles.Button}>
            <Text style={styles.ButtonText}>Sign UP</Text>
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
  tex: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  picker: {
    height: 40,
    width: 300,
    color: 'black',
    marginBottom: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    borderColor: 'grey',
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
  square: {
    width: 350,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    height : 600,
  },
});

export default PlayerSignup;

