import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ScoreInput = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [runInput, setRunInput] = useState('');
    const [modalType, setModalType] = useState('');
    const [dismissalType, setDismissalType] = useState('');

    const openModal = (type) => {
        setModalType(type);
        setModalVisible(true);
    };

    const closeModal = () => {
        setRunInput('');
        setDismissalType('');
        setModalVisible(false);
    };

    const handleRunInput = () => {
        // Handle the run input based on the modalType (WD, NB, BYE, LB)
        console.log(`${modalType} with ${runInput} runs`);
        closeModal();
    };

    const handleDismissal = (type) => {
        // Handle the dismissal logic based on dismissalType
        console.log(`Player is out by ${type}`);
        closeModal();
    };

    const renderScoreButton = (value, onPress = () => {}) => (
        <TouchableOpacity style={styles.scoreButton} onPress={onPress}>
            <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={require('../../../assets/images/mainscreen.png')}
            style={styles.container}
        >
                <View style={styles.square}>
                    <Text style={styles.teamName}>The Hotshots</Text>
                    <Text style={styles.score}>100/2 (12.4/20)</Text>
                    <Text style={styles.projectedScore}>CRR: 7.89 Projected Score: 158</Text>
                </View>
                <View style={styles.batsmanInfo}>
                    <Text style={styles.batsman}>
                        <MaterialIcons name="sports-cricket" size={16} color="black" /> Kunal  20(14)
                    </Text>
                    <Text style={styles.batsman}>
                        <MaterialIcons name="sports-cricket" size={16} color="black" /> Deep  7(3)
                    </Text>
                </View>

                <View style={styles.bowlerInfo}>
                    <Text style={styles.bowler}>Vishnu Chunara</Text>
                    <Text style={styles.bowlerStats}>3.2-20-2</Text>
                </View>

            <View style={styles.keypadContainer}>
                <View style={styles.scoreButtons}>
                    {renderScoreButton(0)}
                    {renderScoreButton(1)}
                    {renderScoreButton(2)}
                    {renderScoreButton(3)}
                </View>
                <View style={styles.lowerButtons}>
                    {renderScoreButton(4)}
                    {renderScoreButton(5)}
                    {renderScoreButton(6)}
                    <TouchableOpacity style={styles.undoButton}>
                        <Text style={styles.buttonText}>UNDO</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lowerButtons}>
                    {renderScoreButton('WD', () => openModal('WD'))}
                    {renderScoreButton('NB', () => openModal('NB'))}
                    {renderScoreButton('BYE', () => openModal('BYE'))}
                    {renderScoreButton('LB', () => openModal('LB'))}
                </View>
                <View style={styles.lowerButtons}>
                    <TouchableOpacity style={styles.outButton} onPress={() => openModal('OUT')}>
                        <Text style={styles.buttonText}>OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {modalType === 'OUT' ? (
                            <>
                                <Text style={styles.modalTitle}>Select Dismissal Type</Text>
                                <View style={styles.dismissalsButtonContainer}>
                                    {renderScoreButton('Bowled', () => handleDismissal('Bowled'))}
                                    {renderScoreButton('Caught', () => handleDismissal('Caught'))}
                                    {renderScoreButton('Run Out', () => handleDismissal('Run Out'))}
                                    {renderScoreButton('LBW', () => handleDismissal('LBW'))}
                                    {renderScoreButton('Stumped', () => handleDismissal('Stumped'))}
                                    {renderScoreButton('Hit Wicket', () => handleDismissal('Hit Wicket'))}
                                    {renderScoreButton('Timed out', () => handleDismissal('Bowled'))}
                                    {renderScoreButton('Handle the ball', () => handleDismissal('Caught'))}
                                    {renderScoreButton('Obstructing field', () => handleDismissal('Run Out'))}
                                    {renderScoreButton('Retired out', () => handleDismissal('LBW'))}
                                </View>
                                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={styles.modalTitle}>Enter Runs for {modalType}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter runs"
                                    keyboardType="numeric"
                                    value={runInput}
                                    onChangeText={setRunInput}
                                />
                                <TouchableOpacity style={styles.modalButton} onPress={handleRunInput}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableOpacity>
                            </>
                        )}
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
            //adjust according to screensize
            alignContent: 'center',
        },
        dismissalsButtonContainer:{
             height :600,        },
        content: {
            flexGrow: 1,
            justifyContent: 'flex-start',
        },
        teamName: {
            fontSize: 32,
            color: 'black',
            marginBottom: 5,
            //bold
            fontWeight: 'bold',
            textAlign: 'center',
        },
        score: {
            fontSize: 32,
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        projectedScore: {
            fontSize: 18,
            color: '#ccc',
            marginTop: 5,
            textAlign: 'center',
        },
        batsmanInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: 'white',
            height: 60,
            marginHorizontal: 20,
            borderRadius: 10,
        },
        batsman: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        square: {
            width: 350,
            height: 250,
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
            margin: 25,
          },
        bowlerInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: 'white',
            height: 60,
            marginHorizontal: 20,
            margin: 10,
            borderRadius: 10,
        },
        bowler: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        bowlerStats: {
            fontSize: 18,
            fontWeight: 'bold',  
        },
        keypadContainer: {
            borderTopWidth: 5,
            //borderColor: '#ddd',
            //padding: 3,
            height: 250,
        },
        scoreButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 3,
            paddingHorizontal: 3,
            margin: 0,
        },
        lowerButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 3,
            paddingVertical: 3,
            margin: 0,
    
        },
        scoreButton: {
            backgroundColor: '#000',
            padding: 15,    
            borderRadius: 10,
            flex: 1,
            alignItems: 'center',
            margin: 5,
            width: 300,
        },
        undoButton: {
            backgroundColor: 'black',
            borderRadius: 5,
            padding: 15,
            alignItems: 'center',
            flex: 1,
        },
        outButton: {
            backgroundColor: 'black',
            borderRadius: 5,
            padding: 15,
            alignItems: 'center',
            flex: 1,
        },
        buttonText: {
            fontSize: 15,
            color: '#fff',
        },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%', // Adjust width as needed
        backgroundColor: 'white',
        borderRadius: 20, // Rounded corners
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },

});

export default ScoreInput;

