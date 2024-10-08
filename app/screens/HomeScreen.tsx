import React from 'react';
import { View, Text,StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import {NavigationProp } from '@react-navigation/native';

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/startpage.png')} style={styles.background}>
        <View style={styles.bcont}>
          <TouchableOpacity 
            style={styles.Button} 
            onPress={() => navigation.navigate('YouAre' as never)}
          >
            <Text style={styles.ButtonText}>Login/SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.Button} 
            onPress={() => navigation.navigate('LiveMatchesSpectator' as never)}
          >
            <Text style={styles.ButtonText}>I am a spectator</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  bcont:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 160,
  },
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
      color: '#ffffff',
  
    },
     ButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    Button: {
      backgroundColor: 'black',
      padding: 10,
      paddingBottom: 10,
      marginBottom: 5,
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
    width: 350, 
    height: 350, 
    backgroundColor : 'white',
    justifyContent: 'center',   
    alignItems: 'center',  
    alignSelf: 'center',
    borderRadius: 20,   
  },
  });

export default HomeScreen