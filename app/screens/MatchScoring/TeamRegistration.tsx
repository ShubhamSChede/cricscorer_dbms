import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const TeamRegistration = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [teamName1, setTeamName1] = useState('');
    const [teamId1, setTeamId1] = useState('');
    const [teamPassword1, setTeamPassword1] = useState('');
    const [teamName2, setTeamName2] = useState('');
    const [teamId2, setTeamId2] = useState('');
    const [teamPassword2, setTeamPassword2] = useState('');
    const [loading, setLoading] = useState(false); // State for loading

    const handleRegisterTeams = async () => {
        // Prepare data for Team 1 and Team 2
        const team1 = {
            name: teamName1,
            roomId: teamId1,
            roompassword: teamPassword1,
        };

        const team2 = {
            name: teamName2,
            roomId: teamId2,
            roompassword: teamPassword2,
        };

        setLoading(true); // Start loading

        try {
            // Send Team 1 data to backend
            const response1 = await fetch('https://cricscorer-backend.onrender.com/api/v1/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(team1),
            });

            // Check if the request was successful for Team 1
            if (!response1.ok) {
                const errorText = await response1.text();
                throw new Error(`Failed to register Team 1: ${errorText}`);
            }

            // Send Team 2 data to backend
            const response2 = await fetch('https://cricscorer-backend.onrender.com/api/v1/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(team2),
            });

            // Check if the request was successful for Team 2
            if (!response2.ok) {
                const errorText = await response2.text();
                throw new Error(`Failed to register Team 2: ${errorText}`);
            }

            // If successful, navigate to MatchDetails
            Alert.alert('Success', 'Teams registered successfully');
            navigation.navigate('MatchDetails', {
                team1,
                team2,
            });
        } catch (error) {
            Alert.alert('Error', (error as Error).message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/mainscreen.png')} style={styles.background}>
                <View style={styles.square}>
                    <Text style={styles.title}>Register Teams</Text>

                    {/* Show ActivityIndicator when loading */}
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <>
                            {/* Team 1 Inputs */}
                            <TextInput
                                style={styles.input}
                                placeholder="Team 1 Name"
                                value={teamName1}
                                onChangeText={setTeamName1}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Team 1 ID"
                                value={teamId1}
                                onChangeText={setTeamId1}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Team 1 Password"
                                value={teamPassword1}
                                secureTextEntry={true}
                                onChangeText={setTeamPassword1}
                            />

                            {/* Team 2 Inputs */}
                            <TextInput
                                style={styles.input}
                                placeholder="Team 2 Name"
                                value={teamName2}
                                onChangeText={setTeamName2}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Team 2 ID"
                                value={teamId2}
                                onChangeText={setTeamId2}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Team 2 Password"
                                value={teamPassword2}
                                secureTextEntry={true}
                                onChangeText={setTeamPassword2}
                            />

                            <TouchableOpacity style={styles.registerButton} onPress={handleRegisterTeams}>
                                <Text style={styles.registerButtonText}>Register Teams</Text>
                            </TouchableOpacity>
                        </>
                    )}
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
        alignSelf : 'center',
    },
    background: {
        flex : 1,
        width: '100%',
        resizeMode: 'contain',
        justifyContent:'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        padding : 20,
    },
    input: {
        height: 50,
        width: '90%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical : 15,
        backgroundColor: '#fff',
        fontSize: 16,
        maxWidth : 340,
        alignSelf : 'center',
    },
    registerButton: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TeamRegistration;
