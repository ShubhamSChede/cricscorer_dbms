import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const PlayerSignup = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [battingHand, setBattingHand] = useState('');
  const [bowlingStyle, setBowlingStyle] = useState('');
  const [role, setRole] = useState('None');
  const [loading, setLoading] = useState(false); // State for handling loader visibility

  const handleSignup = async () => {
    setLoading(true); // Show loader
    try {
      const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/player_auth/player_signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          battingHand,
          bowlingStyle,
          role,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', 'You have successfully signed up!', [
          { text: 'OK', onPress: () => navigation.navigate('LoginPagePlayer') },
        ]);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'An error occurred during sign-up');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while signing up. Please try again.');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/mainscreen.png')} style={styles.background}>
        <View style={styles.square}>
          <Text style={styles.tex}>SIGN UP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
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
          <Picker selectedValue={battingHand} style={styles.picker} onValueChange={setBattingHand}>
            <Picker.Item label="Select Batting Hand" value="" />
            <Picker.Item label="Left Hand" value="Left" />
            <Picker.Item label="Right Hand" value="Right" />
          </Picker>
          <Picker selectedValue={bowlingStyle} style={styles.picker} onValueChange={setBowlingStyle}>
            <Picker.Item label="Select Bowling Style" value="" />
            <Picker.Item label="Left Arm Off Spin" value="LeftArmOffSpin" />
            <Picker.Item label="Left Arm Medium Fast" value="LeftArmMediumFast" />
            <Picker.Item label="Left Arm Leg Spin" value="LeftArmLegSpin" />
            <Picker.Item label="Right Arm Off Spin" value="RightArmOffSpin" />
            <Picker.Item label="Right Arm Medium Fast" value="RightArmMediumFast" />
            <Picker.Item label="Right Arm Leg Spin" value="RightArmLegSpin" />
          </Picker>
          <Picker selectedValue={role} style={styles.picker} onValueChange={setRole}>
            <Picker.Item label="Select Role" value="None" />
            <Picker.Item label="Batsman" value="Batsman" />
            <Picker.Item label="Bowler" value="Bowler" />
            <Picker.Item label="Allrounder" value="Allrounder" />
            <Picker.Item label="Wicket Keeper" value="WicketKeeper" />
          </Picker>

          <TouchableOpacity onPress={() => navigation.navigate('LoginPagePlayer')} style={styles.Button} disabled={loading}>
            <Text style={styles.ButtonText}>ALREADY REGISTERED ?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignup} style={styles.Button} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" /> // Display loader while loading
            ) : (
              <Text style={styles.ButtonText}>SIGN UP</Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
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
    margin: 5,
  },
  square: {
    width: 350,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    height: 600,
  },
});

export default PlayerSignup;


