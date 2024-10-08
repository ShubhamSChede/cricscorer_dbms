import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

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
  },
  input: {
    height: 40,
    width: 300,
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
    margin: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  square: {
    width: 350,
    height: 400,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
});

const ScorerSignup = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSignup = async () => {
    setLoading(true); // Start the loader
    const scorerData = {
      firstname,
      lastname,
      email,
      password,
    };

    try {
      const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/scorer_auth/scorer_signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scorerData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);

        // Navigate to LoginPage after successful signup
        navigation.navigate('LoginPage');
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData.message || 'An error occurred');
        alert('Signup failed: ' + (errorData.message || 'An error occurred'));
      }
    } catch (error) {
      console.error('Error occurred during signup:', error);
      alert('An error occurred during signup. Please try again.');
    } finally {
      setLoading(false); // Stop the loader
    }
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
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <TouchableOpacity onPress={handleSignup} style={styles.Button}>
                <Text style={styles.ButtonText}>CREATE ACCOUNT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} style={styles.Button}>
                <Text style={styles.ButtonText}>ALREADY USER ?</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default ScorerSignup;


