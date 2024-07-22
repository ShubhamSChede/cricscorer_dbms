import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Modal, TextInput, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ScoreInput = () => {
    const [score, setScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [overs, setOvers] = useState('0.0');
    const [currentRunRate, setCurrentRunRate] = useState(7.45);
    const [balls, setBalls] = useState(0);
    const [bowlerStats, setBowlerStats] = useState({ balls: 0, runs: 0, wickets: 0 });
    const [batsmanStats, setBatsmanStats] = useState({ runs: 0, balls: 0 });
    const [modalVisible, setModalVisible] = useState(false);
    const [dismissalType, setDismissalType] = useState('');
    const [extraType, setExtraType] = useState('');
    const [extraRuns, setExtraRuns] = useState('');

    const handleScore = (runs: number, extraType: string = '') => {
        setScore(score + runs);
        if (extraType === '') {
            updateBalls();
        }
        updateBowlerStats(runs, extraType);
        updateBatsmanStats(runs);
    };

    const handleExtraRuns = (type: string) => {
        setExtraType(type);
        setModalVisible(true);
    };

    const handleWicket = () => {
        if (wickets < 10) {
            setModalVisible(true);
        } else {
            console.log("Maximum number of wickets reached.");
        }
    };

    const confirmWicket = (type: string) => {
        setDismissalType(type);
        setWickets(wickets + 1);
        updateBalls();
        updateBowlerStats(0, 'wicket');
        resetBatsmanStats();
        setModalVisible(false);
    };

    const updateBalls = () => {
        let newBalls = balls + 1;
        let newOvers = parseInt(overs.split('.')[0]);
        let remainingBalls = parseInt(overs.split('.')[1]) + 1;
        if (remainingBalls > 5) {
            remainingBalls = 0;
            newOvers += 1;
        }
        setOvers(`${newOvers}.${remainingBalls}`);
        setBalls(newBalls);
    };

    const updateBowlerStats = (runs: number, extraType: string = '') => {
        let newStats = { ...bowlerStats };
        if (extraType === '' || extraType === 'wicket') {
            newStats.balls += 1;
        }
        newStats.runs += runs;
        if (extraType === 'wicket') newStats.wickets += 1;
        setBowlerStats(newStats);
    };

    const updateBatsmanStats = (runs: number) => {
        let newStats = { ...batsmanStats };
        newStats.runs += runs;
        newStats.balls += 1;
        setBatsmanStats(newStats);
    };

    const resetBatsmanStats = () => {
        setBatsmanStats({ runs: 0, balls: 0 });
    };

    const handleConfirmExtraRuns = () => {
        const runs = parseInt(extraRuns);
        if (!isNaN(runs)) {
            handleScore(runs, extraType);
        }
        setModalVisible(false);
        setExtraRuns('');
        setExtraType('');
    };

    const renderScoreButton = (value: number | string, extraType: string = '') => (
        <TouchableOpacity
            style={styles.scoreButton}
            onPress={() => extraType ? handleExtraRuns(extraType) : handleScore(typeof value === 'number' ? value : 0)}>
            <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity>
    );

    const dismissalOptions = [
        'Bowled', 'Caught', 'Caught Behind', 'Caught & Bowled', 'Stumped', 'Run Out', 'LBW', 'Hit Wicket',
        'Retired Hurt', 'Retired Out', 'Run Out (Mankaded)', 'Absent Hurt', 'Hit the Ball Twice',
        'Obstr. the Field', 'Timed Out', 'Retired'
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <ImageBackground
                    source={require('../../assets/images/bg1.png')}
                    style={styles.header}
                >
                    <Text style={styles.teamName}>The Hotshots</Text>
                    <Text style={styles.score}>{`${score}/${wickets} (${overs}/20)`}</Text>
                    <Text style={styles.projectedScore}>CRR: {currentRunRate} Projected Score: {Math.round(currentRunRate * 20)}</Text>
                </ImageBackground>
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
                    <Text style={styles.bowlerStats}>{`${Math.floor(bowlerStats.balls / 6)}.${bowlerStats.balls % 6}-${bowlerStats.runs}-${bowlerStats.wickets}`}</Text>
                </View>
            </ScrollView>
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
                    <TouchableOpacity style={styles.undoButton} onPress={() => { /* Implement undo logic */ }}>
                        <Text style={styles.buttonText}>UNDO</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lowerButtons}>
                    {renderScoreButton('WD', 'wd')}
                    {renderScoreButton('NB', 'nb')}
                    {renderScoreButton('BYE', 'bye')}
                    {renderScoreButton('LB', 'lb')}
                </View>
                <View style={styles.lowerButtons}>
                    <TouchableOpacity style={styles.outButton} onPress={handleWicket}>
                        <Text style={styles.buttonText}>OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalView}>
                    {extraType ? (
                        <>
                            <Text style={styles.modalText}>Enter runs for {extraType.toUpperCase()}</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setExtraRuns}
                                value={extraRuns}
                                keyboardType="numeric"
                            />
                            <Button title="Confirm" onPress={handleConfirmExtraRuns} />
                        </>
                    ) : (
                        <>
                            <Text style={styles.modalText}>Select Dismissal Type</Text>
                            <ScrollView contentContainerStyle={styles.dismissalOptions}>
                                {dismissalOptions.map((type, index) => (
                                    <TouchableOpacity key={index} style={styles.dismissalButton} onPress={() => confirmWicket(type)}>
                                        <Text style={styles.dismissalButtonText}>{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    header: {
        padding: 20,
        backgroundColor: '#333',
        alignContent:'center',
        height: 280,
        justifyContent: 'center',
    },
    teamName: {
        fontSize: 22,
        color: '#fff',
        marginBottom: 5,
        textAlign:'center',
    },
    score: {
        fontSize: 32,
        color: '#fff',
        textAlign:'center',
    },
    projectedScore: {
        fontSize: 18,
        color: '#ccc',
        marginTop: 5,
        textAlign:'center',
    },
    batsmanInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#444',
        height: 60,
    },
    batsman: {
        color: '#fff',
        fontSize: 16,
    },
    bowlerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#555',
        height: 60,
    },
    bowler: {
        color: '#fff',
        fontSize: 18,
    },
    bowlerStats: {
        color: '#fff',
        fontSize: 18,
    },
    keypadContainer: {
        backgroundColor: '#eee',
        borderTopWidth: 5,
        borderColor: '#ddd',
        padding: 3,
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
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        margin: 0,
    },
    undoButton: {
        backgroundColor: '#d3d3d3',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        flex: 1,
    },
    outButton: {
        backgroundColor: '#ff6666',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        flex: 1,
    },
    buttonText: {
        fontSize: 18,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    dismissalOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    dismissalButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        width: '45%',
    },
    dismissalButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        width: 200,
        textAlign: 'center',
        backgroundColor: '#fff',
    },
});

export default ScoreInput;
