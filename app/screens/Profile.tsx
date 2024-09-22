import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';

function Profile(){
  const navigation = useNavigation();

  return (
          <View style={styles.container}>
              <ImageBackground source={require('../../assets/images/mainscreen.png')} style={styles.background}>

      <View style={styles.square}>
        <Text style={styles.tex}>SCORER</Text>
        <Text style={styles.tex}>NAME : PANKAJ KUMAR</Text>
        <Text style={styles.tex}>EMAIL :  pankk123@gmail.com</Text>
      </View>
     
      </ImageBackground>
      </View>
  );
};

const styles = StyleSheet.create({
    background: {
        flex : 1,
        width: '100%',
        resizeMode: 'stretch',
        justifyContent:'center',
      },
      container: {
        flex: 1,                 
        justifyContent: 'center', 
        alignItems: 'center',
        alignContent : 'center' ,
      },
  square: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignSelf : 'center',
  },
  tex: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight:'bold',
    marginLeft: 10,
  },
  Button: {
    backgroundColor: 'black',
    padding: 10,
    paddingBottom: 10,
    marginBottom: 5,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
    alignSelf: 'center',


   },
  ButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Profile;