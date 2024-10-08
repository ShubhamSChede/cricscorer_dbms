import { useRoute, RouteProp } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { View, ImageBackground, Text, StyleSheet, Alert } from "react-native";


type ProfileRouteProp = RouteProp<{ params: { playerDetails: { userType: string; name: string; email: string; role?: string; battingHand?: string; bowlingStyle?: string; } } }, 'params'>;

const Profile: React.FC = () => {
  const route = useRoute<ProfileRouteProp>();

  const handleLogout = () => {
    // Implement your logout logic here
    Alert.alert('Logout', 'You have been logged out.');
  };
  
  // Check if playerDetails is available
  const { playerDetails } = route.params || {};
  
  if (!playerDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.tex}>No player details available.</Text>
      </View>
    );
  }

  const { userType, name, email, role, battingHand, bowlingStyle } = playerDetails;

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/mainscreen.png')} style={styles.background}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.square}>
          <Text style={styles.tex}>ROLE: {userType}</Text>
          <Text style={styles.tex}>NAME: {name}</Text>
          <Text style={styles.tex}>EMAIL: {email}</Text>

          {/* Display player-specific details */}
          {userType === 'player' && (
            <>
              <Text style={styles.tex}>PLAYER ROLE: {role}</Text>
              <Text style={styles.tex}>BATTING HAND: {battingHand}</Text>
              <Text style={styles.tex}>BOWLING STYLE: {bowlingStyle}</Text>
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  square: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignSelf: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tex: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  playerDetailContainer: {
    marginBottom: 20,
  },
});

export default Profile;
