import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

type SelectPlayerProps = {
  navigation: StackNavigationProp<ParamListBase, 'SelectPlayer'>;
};

const SelectPlayer = ({ navigation }: SelectPlayerProps) => {
  const handleNavigation = (playerType: string) => {
    // Handle player selection logic here, potentially with navigation or state updates
    console.log(`Selected ${playerType}`);
  };

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../../../assets/images/mainscreen.png')} style={styles.background}>
      <View style={styles.square}>
      <Text style={styles.title}>Select Players</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Striker')}>
        <Text style={styles.buttonText}>Select Striker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Non-Striker')}>
        <Text style={styles.buttonText}>Select Non-Striker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Bowler')}>
        <Text style={styles.buttonText}>Select Bowler</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={() => navigation.navigate('AppTabs')}>
        <Text style={styles.buttonText}>Next</Text>
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
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    //bold
    fontWeight: 'bold',
  },
  square: {
    width: 300,
    height: 400,
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
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  nextButton: {
    marginTop: 30,
    backgroundColor: 'black', // Different color for the "Next" button if needed
  },
});

export default SelectPlayer;
