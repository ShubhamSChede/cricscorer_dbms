import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#9f9f9f',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    //bold
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#006aa2',
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
    backgroundColor: '#28a745', // Different color for the "Next" button if needed
  },
});

export default SelectPlayer;
