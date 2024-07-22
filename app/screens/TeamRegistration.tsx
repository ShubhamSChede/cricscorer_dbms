import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Modal } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const TeamRegistration = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [teamName1, setTeamName1] = useState('');
    const [teamName2, setTeamName2] = useState('');
    const [isPopupVisible, setPopupVisible] = useState(true);


    const handleRegisterTeams = () => {
        navigation.navigate('PlayerRegistration', { teamName1, teamName2 });
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setPopupVisible(false);
        }, 3000); // Hide the popup after 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);

    return (
        <View style={styles.container}>
        <Modal
            visible={isPopupVisible}
            transparent={true}
            animationType='fade'
        >
            <View style={styles.popupContainer}>
                <Image
                    source={require('../../assets/images/bg8.png')} // Path to your popup image
                    style={styles.popupImage}
                />
            </View>
        </Modal>
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
        //alignItems: 'flex-start',
        //padding: 50,
        //backgroundColor: '#f5f5f5',
    },
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    popupImage: {
        width: 400,
        height: 800,
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
        backgroundColor: '#007bff',
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

