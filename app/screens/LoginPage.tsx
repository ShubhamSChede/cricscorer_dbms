import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ImageBackground , TouchableOpacity, Image, Modal} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const LoginForm = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [isPopupVisible, setPopupVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setPopupVisible(false);
    }, 5000); // Hide the popup after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer
   }, []);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic for handling login goes here
    console.log('Firstname:', firstname);
    console.log('Lastname:', lastname);
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('TeamRegistration');
  };

  return (
  <View style={styles.container}>
        <Modal
            visible={isPopupVisible}
            transparent={true}
            animationType='fade'
        >
            <View style={styles.popupContainer}>
                <Image
                    source={require('../../assets/images/bg8.png')} // Path to your popup image
                    style={styles.popupImage}
                />
            </View>
        </Modal>
    <ImageBackground source={require('../../assets/images/bg6.jpg')} style={styles.background}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          placeholderTextColor="#ccc"
          value={firstname}
          onChangeText={setFirstname}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your last name"
          placeholderTextColor="#ccc"
          value={lastname}
          onChangeText={setLastname}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
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
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    //justifyContent: 'space-evenly',
    //alignItems: 'baseline',
    alignContent: 'flex-end',
    backgroundColor: '#9f9f9f',
  },
  label: {
    marginBottom: 8,
    marginVertical: 5,
    marginLeft: 10,
    fontSize: 16,
    color: '#ffffff',
    padding : 'auto',
  },
  input: {
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    paddingHorizontal: 8,
    color: '#ffffff',

  },
   ButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Button: {
    backgroundColor: '#006aa2',
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
});

export default LoginForm;
