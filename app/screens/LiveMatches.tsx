import React, { useState } from 'react';
import { View, TextInput,Button, StyleSheet, Text, ImageBackground , TouchableOpacity, Image, Modal} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const ScorerSignup = () => {


  return (
  <View style={styles.container}>
    <ImageBackground
        source={require('../../assets/images/mainscreen.png')}
        style={styles.background}>
      <View style={styles.cont}>
      <View style={styles.square}>
        <Text style={styles.MText}>INDIA     VS     PAKISTAN</Text>
        <Text style={styles.sText}>IND 76/3    10.6        1st innings</Text>
      </View>
      <View style={styles.square}>
        <Text style={styles.MText}>INDIA     VS     PAKISTAN</Text>
        <Text style={styles.sText}>IND 98/1    9.6    84 from 32 balls</Text>
      </View>
      <View style={styles.square}>
        <Text style={styles.MText}>INDIA     VS     PAKISTAN</Text>
        <Text style={styles.sText}>IND 06/3    2.5       1st innings</Text>
      </View>
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
    justifyContent:'flex-start',
    //space evenly
    alignContent: 'space-evenly',
  },
  sText :{
    fontSize: 16,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,                 
    justifyContent: 'center', 
    alignItems: 'center',
    alignContent : 'center' ,
  },
  cont:{
     alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      paddingTop: 60,

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
   MText: {
    fontWeight: '900',
    fontSize: 18,
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
  height: 80, // Set the height of the square (same as width)
  backgroundColor : 'white',
  justifyContent: 'center',     // Optional: Center content vertically
  alignItems: 'center',  
  alignSelf: 'center',
  borderRadius: 20, 
  margin  : 10,   // Optional: Center content horizontally
},
});

export default ScorerSignup;