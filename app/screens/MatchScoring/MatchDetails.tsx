import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { ImageBackground } from 'react-native';

type MatchDetailsProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

type Team = {
  name: string;
  roomId: string;
  roompassword: string;
};

const MatchDetails = ({ route, navigation }: MatchDetailsProps) => {
  const { team1, team2 } = route.params as { team1: Team; team2: Team };
  const [overs, setOvers] = useState('');
  const [oversperballer, setOversPerBowler] = useState('');
  const [matchLocation, setLocation] = useState('');
  const [ballType, setBallType] = useState('');

  const handleCreateMatch = async () => {
    if (!overs || !oversperballer || !matchLocation) {
      Alert.alert('Error', 'All input fields are required');
      return;
    }

    const matchDetails = {
      overs: parseInt(overs),
      oversperballer: parseInt(oversperballer),
      ballType,
      matchLocation,
      team1RoomId: team1.roomId,
      team1Password: team1.roompassword,
      team2RoomId: team2.roomId,
      team2Password: team2.roompassword
    };

    try {
      const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/create_match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Match created successfully:', data);
        navigation.navigate('TossResult', {
            team1: { id: team1.roomId, name: team1.roompassword },
            team2: { id: team2.roomId, name: team2.roompassword }
          });
      } else {
        const errorData = await response.json();
        console.error('Error creating match:', errorData);
        Alert.alert('Error', 'Failed to create match. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/mainscreen.png')} style={styles.background}>
        <View style={styles.square}>
          <Text style={styles.title}>Enter Match Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Overs"
            keyboardType="numeric"
            value={overs}
            onChangeText={setOvers}
          />
          <TextInput
            style={styles.input}
            placeholder="Overs per bowler"
            keyboardType="numeric"
            value={oversperballer}
            onChangeText={setOversPerBowler}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={matchLocation}
            onChangeText={setLocation}
          />
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Ball Type:</Text>
            <Picker
              selectedValue={ballType}
              style={styles.picker}
              onValueChange={(itemValue) => setBallType(itemValue)}
            >
              <Picker.Item label="Tennis" value="tennis" />
              <Picker.Item label="Leather" value="leather" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          <TouchableOpacity onPress={handleCreateMatch} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>NEXT</Text>
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
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '92%',
    borderRadius: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '92%',
  },
  pickerLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    backgroundColor: '#eee',
  },
  square: {
    width: 350,
    height: 600,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  nextButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MatchDetails;