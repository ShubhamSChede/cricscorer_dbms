import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';

function YouAre(){
  const navigation = useNavigation();

  return (
          <View style={styles.container}>
              <ImageBackground source={require('../../../assets/images/mainscreen.png')} style={styles.background}>

      <View style={styles.square}>
        <Text style={styles.tex}>LOG IN AS </Text>
        <TouchableOpacity 
          style={styles.Button} 
          onPress={() => navigation.navigate('ScorerSignUp' as never)}
        >
          <Text style={styles.ButtonText}>Scorer</Text>
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
    alignItems: 'center',
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
    fontSize: 28,
    marginBottom: 20,
    fontWeight:'bold',
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

export default YouAre;

