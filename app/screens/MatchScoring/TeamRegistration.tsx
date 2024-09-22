import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const TeamRegistration = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [teamName1, setTeamName1] = useState('');
    const [teamName2, setTeamName2] = useState('');

    const handleRegisterTeams = () => {
        navigation.navigate('SelectPlayer');
    };
   

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/mainscreen.png')} style={styles.background}>
            <View style={styles.square}>
            <Text style={styles.title}>Register Teams</Text>
            <TextInput
                style={styles.input}
                placeholder="Team 1 Name"
                value={teamName1}
                onChangeText={setTeamName1}
            />
             <TextInput
                style={styles.input}
                placeholder="Team 1 ID"
                value={teamName1}
                onChangeText={setTeamName1}
            />
             <TextInput
                style={styles.input}
                placeholder="Team 1 PASSWORD"
                value={teamName1}
                onChangeText={setTeamName1}
            />
            <TextInput
                style={styles.input}
                placeholder="Team 2 Name"
                value={teamName2}
                onChangeText={setTeamName2}
            />
             <TextInput
                style={styles.input}
                placeholder="Team 2 ID"
                value={teamName1}
                onChangeText={setTeamName1}
            />
             <TextInput
                style={styles.input}
                placeholder="Team 2 PASSWORD"
                value={teamName1}
                onChangeText={setTeamName1}
            />
            <TouchableOpacity style={styles.registerButton} onPress={handleRegisterTeams}>
                <Text style={styles.registerButtonText}>Register Teams</Text>
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
        //alignItems: 'flex-start',
        //padding: 50,

        //backgroundColor: '#f5f5f5',
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
        //color: '#fff',
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

