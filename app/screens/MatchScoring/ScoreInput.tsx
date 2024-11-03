import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Modal, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

type RootStackParamList = {
    ScoreInput: { 
        battingTeam: string; 
        bowlingTeam: string; 
        isSecondInnings?: boolean; 
        target?: number;
        battingTeamId?: string;
        matchId: string;  // Make this required
    };
};

type ScoreInputNavigationProp = StackNavigationProp<RootStackParamList, 'ScoreInput'>;
type ScoreInputRouteProp = RouteProp<RootStackParamList, 'ScoreInput'>;

interface Props {
    navigation: ScoreInputNavigationProp;
    route: ScoreInputRouteProp;
}

const ScoreInput: React.FC<Props> = ({ route, navigation }) => {
    console.log("ScoreInput params:", route.params);
    const { 
        battingTeam, 
        bowlingTeam, 
        isSecondInnings = false, 
        target, 
        battingTeamId,
        matchId
    } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [runInput, setRunInput] = useState('');
    const [modalType, setModalType] = useState('');
    const [dismissalType, setDismissalType] = useState('');
    const [totalScore, setTotalScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [overs, setOvers] = useState(0);
    const [balls, setBalls] = useState(0);
    const [isInningsEnded, setIsInningsEnded] = useState(false);
    const [result, setResult] = useState('');
    const MAX_OVERS = 2;

      // Function to fetch teamId based on team name
      const fetchTeamId = async (teamName: string): Promise<string | null> => {
        try {
            const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomId: teamName })
            });

            const data = await response.json();
            if (response.ok) {
                return data.team.id;
            } else {
                Alert.alert('Error', 'Failed to fetch team ID');
                return null;
            }
        } catch (error) {
            console.error('Error fetching team ID:', error);
            Alert.alert('Error', 'Failed to fetch team ID');
            return null;
        }
    };

         // Function to post match result
    const postMatchResult = async (winningTeamId: string): Promise<boolean> => {
        try {
            console.log("Posting match result with data:", {
                winnerId: winningTeamId,
                matchId: route.params.matchId
            });

            const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    winnerId: winningTeamId,
                    matchId: route.params.matchId
                }),
                credentials: 'include',
            });

            console.log("Response status:", response.status);
            const data = await response.json();
            console.log("Response data:", data);

            if (response.ok) {
                console.log('Match result posted successfully:', data);
                return true;
            } else {
                console.error('Failed to post match result:', data);
                Alert.alert('Error', 'Failed to post match result');
                return false;
            }
        } catch (error) {
            console.error('Error posting match result:', error);
            Alert.alert('Error', 'Failed to post match result');
            return false;
        }
    };

    useEffect(() => {
        if (overs >= MAX_OVERS || wickets >= 10) {
            endInnings();
        }
    }, [overs, wickets]);

    useEffect(() => {
        setTotalScore(0);
        setWickets(0);
        setOvers(0);
        setBalls(0);
        setIsInningsEnded(false);
        setResult('');
    }, [battingTeam, bowlingTeam]);

    const openModal = (type: string) => {
        setModalType(type);
        setModalVisible(true);
    };

    const closeModal = () => {
        setRunInput('');
        setDismissalType('');
        setModalVisible(false);
    };

    const handleRunInput = async () => {
        const runs = parseInt(runInput);
        if (!isNaN(runs)) {
            if (modalType === 'WD' || modalType === 'NB') {
                await updateScoreOnServer(runs + 1, 0, false);
            } else {
                await updateScoreOnServer(runs, 0, true);
            }
        }
        closeModal();
    };

    const handleDismissal = async (type: string) => {
        if (type === 'Run Out') {
            openModal('RUN_OUT');
        } else {
            console.log(`Player is out by ${type}`);
            await updateScoreOnServer(0, 1, true);
            closeModal();
        }
    };

    // Function to handle match completion and navigation
    const handleMatchCompletion = (winner: string, margin: string) => {
        setResult(`${winner} won by ${margin}!`);
        
        // Navigate to AppTabsBeginning after 10 seconds
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'AppTabsBeginning' }],
                })
            );
        }, 10000);
    };

    // Function to handle the PATCH request and update the score
    const updateScoreOnServer = async (runs: number, wicketsChange: number, updateBalls: boolean) => {
        try {
            const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/scorecard', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    runs: runs,
                    wickets: wicketsChange,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                const newTotalScore = totalScore + runs;
                setTotalScore(newTotalScore);
                setWickets((prevWickets) => Math.min(prevWickets + wicketsChange, 10));

                // Check if target has been reached in second innings
                if (isSecondInnings && target && newTotalScore >= target) {
                    setIsInningsEnded(true);
                    const winningTeamId = await fetchTeamId(battingTeam);
                    if (winningTeamId) {
                        await postMatchResult(winningTeamId);
                        handleMatchCompletion(battingTeam, `${10 - wickets} wickets`);
                    }
                    return;
                }

                // Update balls and overs only if updateBalls is true
                if (updateBalls) {
                    setBalls((prevBalls) => {
                        const newBalls = prevBalls + 1;
                        if (newBalls === 6) {
                            // Reset balls and increment overs
                            setOvers((prevOvers) => prevOvers + 1);
                            return 0;
                        }
                        return newBalls;
                    });
                }
                
                // Check if innings should end
                if (overs >= MAX_OVERS || wickets >= 10) {
                    endInnings();
                }
            } else {
                Alert.alert('Error', result.message || 'Failed to update score');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong while updating the score');
        }
    };
    
   
    // Function to create new innings
    const createNewInnings = async (teamId: string): Promise<boolean> => {
        try {
            const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/innings/create_innings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inningsNumber: 2,
                    inningsType: 'Bat',
                    teamid_tosswon: teamId
                }),
            });

            if (response.ok) {
                return true;
            } else {
                Alert.alert('Error', 'Failed to create new innings');
                return false;
            }
        } catch (error) {
            console.error('Error creating new innings:', error);
            Alert.alert('Error', 'Failed to create new innings');
            return false;
        }
    };

    const endInnings = async () => {
        setIsInningsEnded(true);
        
        if (isSecondInnings) {
            // Match has ended
            const targetReached = totalScore >= target!;
            const winner = targetReached ? battingTeam : bowlingTeam;
            const margin = targetReached 
                ? `${10 - wickets} wickets` 
                : `${target! - totalScore} runs`;
            
            console.log("Match ended with:", {
                winner,
                margin,
                matchId: route.params.matchId
            });

            // Get winner's team ID
            const winningTeamId = await fetchTeamId(winner);
            console.log("Winner team ID:", winningTeamId);
            
            if (winningTeamId) {
                // Post the match result
                const resultPosted = await postMatchResult(winningTeamId);
                console.log("Result posted:", resultPosted);
                
                if (resultPosted) {
                    handleMatchCompletion(winner, margin);
                } else {
                    Alert.alert('Warning', 'Match ended but failed to save result');
                    handleMatchCompletion(winner, margin);
                }
            } else {
                Alert.alert('Warning', 'Match ended but failed to save result');
                handleMatchCompletion(winner, margin);
            }
        } else {
            // First innings ended
            const newTarget = totalScore + 1;
            
            // Fetch team ID for the team that will bat in second innings
            const secondInningsTeamId = await fetchTeamId(bowlingTeam);
            
            if (secondInningsTeamId) {
                // Create new innings for second batting team
                const inningsCreated = await createNewInnings(secondInningsTeamId);
                
                if (inningsCreated) {
                    // Navigate to ScoreInput for second innings
                    navigation.navigate('ScoreInput', {
                        battingTeam: bowlingTeam,
                        bowlingTeam: battingTeam,
                        isSecondInnings: true,
                        target: newTarget,
                        battingTeamId: secondInningsTeamId,
                        matchId: route.params.matchId
                    });
                } else {
                    Alert.alert('Error', 'Failed to start second innings');
                }
            } else {
                Alert.alert('Error', 'Failed to get team information for second innings');
            }
        }
    };

    const renderScoreButton = (value: string | number, onPress = () => {}) => (
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
                <Text style={styles.teamName}>{battingTeam}</Text>
                <Text style={styles.score}>{totalScore}/{wickets} ({overs}.{balls}/{MAX_OVERS})</Text>
                <Text style={styles.projectedScore}>
                    CRR: {((totalScore / (overs + balls / 6)) || 0).toFixed(2)} 
                    Projected Score: {Math.round(totalScore * (MAX_OVERS / (overs + balls / 6)) || 0)}
                </Text>
                <Text style={styles.bowlingTeam}>Bowling: {bowlingTeam}</Text>
                {isSecondInnings && <Text style={styles.target}>Target: {target}</Text>}
                {isInningsEnded && <Text style={styles.result}>{result}</Text>}
            </View>
            
            <View style={styles.keypadContainer}>
                <View style={styles.scoreButtons}>
                    {renderScoreButton(0, () => updateScoreOnServer(0, 0, true))}
                    {renderScoreButton(1, () => updateScoreOnServer(1, 0, true))}
                    {renderScoreButton(2, () => updateScoreOnServer(2, 0, true))}
                    {renderScoreButton(3, () => updateScoreOnServer(3, 0, true))}
                </View>
                <View style={styles.lowerButtons}>
                    {renderScoreButton(4, () => updateScoreOnServer(4, 0, true))}
                    {renderScoreButton(5, () => updateScoreOnServer(5, 0, true))}
                    {renderScoreButton(6, () => updateScoreOnServer(6, 0, true))}
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

            {/* Modal for Dismissals and Run Inputs */}
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
                                </View>
                                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </>
                        ) : modalType === 'RUN_OUT' ? (
                            <>
                                <Text style={styles.modalTitle}>Enter Runs Scored Before Run Out</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter runs"
                                    keyboardType="numeric"
                                    value={runInput}
                                    onChangeText={setRunInput}
                                />
                                <TouchableOpacity style={styles.modalButton} onPress={async () => {
                                    const runs = parseInt(runInput);
                                    await handleRunInput();
                                }}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={styles.modalTitle}>Enter Runs</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter runs"
                                    keyboardType="numeric"
                                    value={runInput}
                                    onChangeText={setRunInput}
                                />
                                <TouchableOpacity style={styles.modalButton} onPress={handleRunInput}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                    <Text style={styles.buttonText}>Cancel</Text>
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
        teamNameBlack: {
            fontSize: 32,
            color: 'black',
            marginBottom: 5,
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
          teamName: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 10,
        },
        target: {
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 10,
        },
        bowlingTeam: {
            fontSize: 18,
            color: 'black',
            marginTop: 10,
        },
        keypadContainer: {
            //borderTopWidth: 5,
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
            margin: 10,
            width: 300,
            height: 65,
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
            marginHorizontal: 10,
            marginBottom: 50,
        },
        buttonText: {
            fontSize: 20,
            color: '#fff',
        },
    result: {
        fontSize: 18,
        color: 'black',
        marginTop: 10,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20, 
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

