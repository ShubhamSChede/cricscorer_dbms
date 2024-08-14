import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const TeamRegistration = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [teamName1, setTeamName1] = useState('');
    const [teamName2, setTeamName2] = useState('');

    const handleRegisterTeams = () => {
        navigation.navigate('MatchDetails');
    };
   

    return (
        <View style={styles.container}>
             <ImageBackground
                source={require('../../assets/images/bg6.jpg')}
                style={styles.container}
                //fill image
            >
            <Text style={styles.title}>Register Teams</Text>
            <TextInput
                style={styles.input}
                placeholder="Team 1 Name"
                value={teamName1}
                onChangeText={setTeamName1}
            />
            <TextInput
                style={styles.input}
                placeholder="Team 2 Name"
                value={teamName2}
                onChangeText={setTeamName2}
            />
            <TouchableOpacity style={styles.registerButton} onPress={handleRegisterTeams}>
                <Text style={styles.registerButtonText}>Register Teams</Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {   
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        padding : 20,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical : 15,
        backgroundColor: '#fff',
        fontSize: 16,
        maxWidth : 360,
        alignSelf : 'center',
    },
    registerButton: {
        backgroundColor: '#006aa2',
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

