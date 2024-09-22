import React, { useState} from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const LoginPage: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/scorer_auth/scorer_login',   
 {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();   

        console.log('Login successful:', data);   

        // Handle successful login, e.g., store token, navigate
        navigation.navigate('AppTabsBeginning');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message || 'An error occurred');
        alert('Login failed: ' + (errorData.message || 'An error occurred'));
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      alert('An error occurred during login. Please try again.');
    }
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
            <Text style={styles.ButtonText}>Login</Text>

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
popupImage: {
    width: 400,
    height: 800,
},
square: {
  width: 350,  
  height: 350, 
  backgroundColor : 'white',
  justifyContent: 'center',     
  alignItems: 'center',  
  alignSelf: 'center',
  borderRadius: 20,      
},
});

export default LoginPage;