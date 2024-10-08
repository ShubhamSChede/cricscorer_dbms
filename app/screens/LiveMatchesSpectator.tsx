import React from 'react';
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';

const LiveMatchesSpectator = () => {

    
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/mainscreen.png')}
        style={styles.background}
      >
        <View style={styles.content}>
          {/* Match Card 1 */}
          <View style={styles.scoreCard}>
            <View style={styles.row}>
              {/* Team 1 Logo and Name */}
              <View style={styles.teamContainer}>
                <Image style={styles.logo} source={require('../../assets/images/india.svg')} />
                <Text style={styles.teamName}>India</Text>
              </View>
              
              {/* Match Details */}
              <View style={styles.matchInfo}>
                <Text style={styles.inningsText}>INDIA VS PAKISTAN</Text>
                <Text style={styles.statusText}>IND 76/3 (10.6 ov)</Text>
                <Text style={styles.requiredText}>India need 93 runs from 43.3 overs</Text>
              </View>

              {/* Team 2 Logo and Name */}
              <View style={styles.teamContainer}>
                <Image style={styles.logo} source={require('../../assets/images/pakistan.png')} />
                <Text style={styles.teamName}>Pakistan</Text>
              </View>
            </View>
          </View>

          {/* Match Card 2 */}
          <View style={styles.scoreCard}>
            <View style={styles.row}>
              {/* Team 1 Logo and Name */}
              <View style={styles.teamContainer}>
                <Image style={styles.logo} source={require('../../assets/images/sa.png')} />
                <Text style={styles.teamName}>SA</Text>
              </View>
              
              {/* Match Details */}
              <View style={styles.matchInfo}>
                <Text style={styles.inningsText}>SOUTH AFRICA VS AUSTRALIA</Text>
                <Text style={styles.statusText}>AUS 78/5 (12.1 ov)</Text>
                <Text style={styles.requiredText}>Australia need 2 runs from 29 overs</Text>
              </View>

              {/* Team 2 Logo and Name */}
              <View style={styles.teamContainer}>
                <Image style={styles.logo} source={require('../../assets/images/aus.png')} />
                <Text style={styles.teamName}>AUS</Text>
              </View>
            </View>
          </View>

          {/* Match Card 3 */}
          <View style={styles.scoreCard}>
            <View style={styles.row}>
              {/* Team 1 Logo and Name */}
              <View style={styles.teamContainer}>
                <Image style={styles.logo} source={require('../../assets/images/england.png')} />
                <Text style={styles.teamName}>England</Text>
              </View>
              
              {/* Match Details */}
              <View style={styles.matchInfo}>
                <Text style={styles.inningsText}>ENGLAND VS NEW ZEALAND</Text>
                <Text style={styles.statusText}>ENG 150/2 (20 ov)</Text>
                <Text style={styles.requiredText}>New Zealand need 151 runs from 20 overs</Text>
              </View>

              {/* Team 2 Logo and Name */}
              <View style={styles.teamContainer}>
                <Image style={styles.logo} source={require('../../assets/images/england.png')} />
                <Text style={styles.teamName}>New Zealand</Text>
              </View>
            </View>
          </View>

          {/* Match Card 4 */}
          <View style={styles.scoreCard}>
            <View style={styles.row}>
              {/* Team 1 Logo and Name */}
              <View style={styles.teamContainer}>
                <Image style={styles.logo} source={require('../../assets/images/sa.png')} />
                <Text style={styles.teamName}>South Africa</Text>
              </View>
              
              {/* Match Details */}
              <View style={styles.matchInfo}>
                <Text style={styles.inningsText}>SOUTH AFRICA VS AUSTRALIA</Text>
                <Text style={styles.statusText}>WI 200/5 (50 ov)</Text>
                <Text style={styles.requiredText}>Sri Lanka need 201 runs from 50 overs</Text>
              </View>

              {/* Team 2 Logo and Name */}
              <View style={styles.teamContainer}>
                <Image style={styles.logo} source={require('../../assets/images/aus.png')} />
                <Text style={styles.teamName}>Australia</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  scoreCard: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '95%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  matchInfo: {
    flex: 1,
    alignItems: 'center',
  },
  inningsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  requiredText: {
    marginTop: 5,
    fontSize: 12,
    color: '#444',
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
});

export default LiveMatchesSpectator;