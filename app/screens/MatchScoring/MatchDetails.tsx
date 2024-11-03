import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
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
  const [overs, setOvers] = useState('2');  // Default to 2, but allow changes
  const [oversperballer, setOversPerBowler] = useState('');
  const [matchLocation, setLocation] = useState('');
  const [ballType, setBallType] = useState('');
  const [loading, setLoading] = useState(false); // State for loading

  const handleCreateMatch = async () => {
    if (!overs || !oversperballer || !matchLocation || !ballType) {
      Alert.alert('Error', 'All input fields are required');
      return;
    }
  
    // Collect match details and include required inputs
    const matchDetails = {
      team1RoomId: team1.roomId,
      team1Password: team1.roompassword,
      team2RoomId: team2.roomId,
      team2Password: team2.roompassword,
      overs: parseInt(overs, 10),  // Convert string to number
      oversPerBowler: parseInt(oversperballer, 10),  // Convert string to number
      matchLocation: matchLocation,
      ballType: ballType,
    };
  
    console.log("matchDetails: ", matchDetails);
  
    try {
      setLoading(true); 
      const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/create_match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchDetails),
      });
  
      console.log("response: ", response);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Match created successfully:', data);
        navigation.navigate('TossResult', {
          team1: { id: team1.roomId, name: team1.name },
          team2: { id: team2.roomId, name: team2.name }
        });
      } else {
        const errorData = await response.json();
        console.error('Error creating match:', errorData);
        Alert.alert('Error', 'Failed to create match. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/mainscreen.png')} style={styles.background}>
        <View style={styles.square}>
          <Text style={styles.title}>Enter Match Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Total Overs"
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
              <Picker.Item label="Select Ball Type" value="" />
              <Picker.Item label="Leather" value="Leather" />
              <Picker.Item label="Tennis" value="Tennis" />
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateMatch}
            disabled={loading}  // Disable button when loading
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Match</Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  square: {
    width: 330,
    height: 620,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignSelf: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 20,
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    maxWidth: 340,
    alignSelf: 'center',
  },
  pickerContainer: {
    width: '90%',
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MatchDetails;
