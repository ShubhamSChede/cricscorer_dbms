import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const Login = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for handling loader visibility

  const handleLogin = async () => {
    setLoading(true); // Show loader
    try {
      const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/player_auth/player_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        navigation.navigate('AppTabsBeginningPlayer', { playerDetails: data }); // Pass player details
      } else {
        const errorData = await response.json();
        Alert.alert('Login Failed', errorData.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'An error occurred while trying to log in. Please try again later.');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/mainscreen.png')} style={styles.background}>
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
          <TouchableOpacity onPress={handleLogin} style={styles.Button} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" /> // Display loader while loading
            ) : (
              <Text style={styles.ButtonText}>Login</Text>
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
    alignItems: 'center',
    alignSelf: 'center',
  },
  square: {
    width: 350,
    height: 350,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
});

export default Login;