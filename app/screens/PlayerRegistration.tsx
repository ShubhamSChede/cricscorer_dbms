import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, ImageBackground, Modal, TouchableOpacity } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type PlayerRegistrationProps = {
  route: RouteProp<ParamListBase, 'PlayerRegistration'>;
  navigation: StackNavigationProp<ParamListBase, 'PlayerRegistration'>;
};

type Player = {
  name: string;
  type: 'Batsman' | 'Bowler' | 'All-rounder';
  battingHand: 'Left' | 'Right';
  bowlingStyle?: string;
};

const PlayerRegistration = ({ route, navigation }: PlayerRegistrationProps) => {
  const { teamName }: { teamName?: string } = route?.params || {};
  const [team1Players, setTeam1Players] = useState<Player[]>([]);
  const [team2Players, setTeam2Players] = useState<Player[]>([]);
  const [team1PlayerName, setTeam1PlayerName] = useState('');
  const [team2PlayerName, setTeam2PlayerName] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isPlayerTypeModalVisible, setPlayerTypeModalVisible] = useState(false);
  const [isBattingHandModalVisible, setBattingHandModalVisible] = useState(false);
  const [isBowlingStyleModalVisible, setBowlingStyleModalVisible] = useState(false);

  const handleRegisterPlayer = (team: 'team1' | 'team2') => {
    if (team === 'team1' && team1PlayerName) {
      setCurrentPlayer({ name: team1PlayerName, type: 'Batsman', battingHand: 'Right' });
      setPlayerTypeModalVisible(true);
    } else if (team === 'team2' && team2PlayerName) {
      setCurrentPlayer({ name: team2PlayerName, type: 'Batsman', battingHand: 'Right' });
      setPlayerTypeModalVisible(true);
    }
  };

  const handlePlayerTypeSelect = (type: Player['type']) => {
    if (currentPlayer) {
      setCurrentPlayer({ ...currentPlayer, type });
      setPlayerTypeModalVisible(false);
      setBattingHandModalVisible(true);
    }
  };

  const handleBattingHandSelect = (battingHand: Player['battingHand']) => {
    if (currentPlayer) {
      setCurrentPlayer({ ...currentPlayer, battingHand });
      setBattingHandModalVisible(false);
      if (currentPlayer.type === 'Bowler' || currentPlayer.type === 'All-rounder') {
        setBowlingStyleModalVisible(true);
      } else {
        finalizePlayerRegistration();
      }
    }
  };

  const handleBowlingStyleSelect = (bowlingStyle: string) => {
    if (currentPlayer) {
      setCurrentPlayer({ ...currentPlayer, bowlingStyle });
      setBowlingStyleModalVisible(false);
      finalizePlayerRegistration();
    }
  };

  const finalizePlayerRegistration = () => {
    if (currentPlayer) {
      if (team1PlayerName) {
        setTeam1Players([...team1Players, currentPlayer]);
        setTeam1PlayerName('');
      } else if (team2PlayerName) {
        setTeam2Players([...team2Players, currentPlayer]);
        setTeam2PlayerName('');
      }
      setCurrentPlayer(null);
    }
  };

  const renderPlayerItem = ({ item }: { item: Player }) => (
    <Text style={styles.playerItem}>
      {item.name} - {item.type} - {item.battingHand}
      {item.type !== 'Batsman' && item.bowlingStyle ? ` - ${item.bowlingStyle}` : ''}
    </Text>
  );

  return (
    <ImageBackground source={require('../../assets/images/bg6.jpg')} style={styles.container}>
      <Text style={styles.title}>Register Players for {teamName}</Text>
      <Text style={styles.subTitle}>TEAM 1</Text>
      <TextInput
  style={styles.input}
  placeholder="Player Name"
  value={team1PlayerName}
  onChangeText={setTeam1PlayerName}
/>
<TouchableOpacity style={styles.modalButton} onPress={() => handleRegisterPlayer('team1')}>
  <Text style={styles.modalButtonText}>Add Player</Text>
</TouchableOpacity>
      <FlatList
        data={team1Players}
        renderItem={renderPlayerItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        ListEmptyComponent={<Text style={styles.noPlayersText}>No players added yet.</Text>}
      />
      <Text style={styles.subTitle}>TEAM 2</Text>
      <TextInput
  style={styles.input}
  placeholder="Player Name"
  value={team2PlayerName}
  onChangeText={setTeam2PlayerName}
/>
<TouchableOpacity style={styles.modalButton} onPress={() => handleRegisterPlayer('team2')}>
  <Text style={styles.modalButtonText}>Add Player</Text>
</TouchableOpacity>
      <FlatList
        data={team2Players}
        renderItem={renderPlayerItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        ListEmptyComponent={<Text style={styles.noPlayersText}>No players added yet.</Text>}
      />
      <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('TossResult')}>
  <Text style={styles.modalButtonText}>Done</Text>
      </TouchableOpacity>

      {/* Player Type Modal */}
      <Modal visible={isPlayerTypeModalVisible} transparent={true} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Select Player Type</Text>
      {['Batsman', 'Bowler', 'All-rounder'].map((type) => (
        <TouchableOpacity key={type} style={styles.modalButton} onPress={() => handlePlayerTypeSelect(type as Player['type'])}>
          <Text style={styles.modalButtonText}>{type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
</Modal>

      {/* Batting Hand Modal */}
      <Modal visible={isBattingHandModalVisible} transparent={true} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Select Batting Hand</Text>
      {['Left', 'Right'].map((hand) => (
        <TouchableOpacity key={hand} style={styles.modalButton} onPress={() => handleBattingHandSelect(hand as Player['battingHand'])}>
          <Text style={styles.modalButtonText}>{hand}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
</Modal>

      {/* Bowling Style Modal */}
      <Modal visible={isBowlingStyleModalVisible} transparent={true} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Select Bowling Style</Text>
      {['Left arm off', 'Left arm leg', 'Left arm medium pace', 'Left arm fast', 'Right arm off', 'Right arm leg', 'Right arm medium pace', 'Right arm fast'].map((style) => (
        <TouchableOpacity key={style} style={styles.modalButton} onPress={() => handleBowlingStyleSelect(style)}>
          <Text style={styles.modalButtonText}>{style}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
</Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  subTitle: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  playerItem: {
    fontSize: 18,
    padding: 5,
    color: '#fff',
  },
  noPlayersText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //blur background
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    //alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#006aa2', // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center', // Center text horizontally
  },
  modalButtonText: {
    color: '#fff', // Button text color
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PlayerRegistration;

