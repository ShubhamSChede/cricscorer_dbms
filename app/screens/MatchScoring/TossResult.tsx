import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    TossResult: { 
      team1: { id: string; name: string };
      team2: { id: string; name: string };
    };
    ScoreInput: { battingTeam: string; bowlingTeam: string };
    // Add other screens here if needed
};

type TossResultRouteProp = RouteProp<RootStackParamList, 'TossResult'>;
type TossResultNavigationProp = StackNavigationProp<RootStackParamList, 'TossResult'>;

interface Props {
    route: TossResultRouteProp;
    navigation: TossResultNavigationProp;
}

const TossResult = () => {
    const navigation = useNavigation<TossResultNavigationProp>();
    const route = useRoute<TossResultRouteProp>();
    const { team1, team2 } = route.params;
    const [tossWinner, setTossWinner] = useState<'Team1' | 'Team2' | null>(null);
    const [decision, setDecision] = useState<'Bat' | 'Bowl' | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // State for loader
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

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
            Alert.alert('Error', 'Something went wrong');
            return null;
        }
    };

    const createInnings = async (teamId: string): Promise<boolean> => {
        try {
            const inningsType = decision === 'Bat' ? 'Bat' : 'Bowl';
            const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/innings/create_innings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inningsType,
                    teamid_tosswon: teamId
                }),
            });
        
            if (response.ok) {
                await response.json();
                return true;
            } else {
                Alert.alert('Error', 'Failed to create innings');
                return false;
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
            return false;
        }
    };

    const handleNext = async () => {
        if (!tossWinner || !decision) {
            Alert.alert('Error', 'Please select both the toss winner and decision');
            return;
        }
        setLoading(true); 
        const winningTeam = tossWinner === 'Team1' ? team1 : team2;
        const teamId = await fetchTeamId(winningTeam.name);
        
        if (teamId) {
            const inningsCreated = await createInnings(teamId);
            
            if (inningsCreated) {
                const battingTeam = (tossWinner === 'Team1' && decision === 'Bat') || 
                                  (tossWinner === 'Team2' && decision === 'Bowl') ? 
                                  team1.name : team2.name;
                const bowlingTeam = battingTeam === team1.name ? team2.name : team1.name;

                navigation.navigate('ScoreInput', {
                    battingTeam,
                    bowlingTeam
                });
            }
        }
        setLoading(false);
    };

    return (
        <ImageBackground
            source={require('../../../assets/images/mainscreen.png')}
            style={{ flex: 1, alignContent: 'center' }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <Animated.View style={{ opacity: fadeAnim, flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 }}>
                        <Text style={{ color: 'white', fontSize: 40, marginTop: 10, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' }}>Toss Results</Text>
                        
                        <Text style={{ fontSize: 22, marginVertical: 10, textAlign: 'center', fontWeight: 'bold' }}>Who won the toss?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%', marginVertical: 10 }}>
                            <TouchableOpacity
                                style={{ padding: 15, borderWidth: 1, borderColor: '#000', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 100, height: 100, backgroundColor: tossWinner === 'Team1' ? '#000000' : '#fff' }}
                                onPress={() => setTossWinner('Team1')}
                            >
                                <Text style={{ marginTop: 5, fontSize: 18, color: tossWinner === 'Team1' ? '#fff' : '#000' }}>
                                    {team1.name}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ padding: 15, borderWidth: 1, borderColor: '#000', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 100, height: 100, backgroundColor: tossWinner === 'Team2' ? '#000000' : '#fff' }}
                                onPress={() => setTossWinner('Team2')}
                            >
                                <Text style={{ marginTop: 5, fontSize: 18, color: tossWinner === 'Team2' ? '#fff' : '#000' }}>
                                    {team2.name}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 22, marginVertical: 10, textAlign: 'center', fontWeight: 'bold' }}>Decision</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%', marginVertical: 10 }}>
                            <TouchableOpacity
                                style={{ padding: 15, borderWidth: 1, borderColor: '#000', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 100, height: 100, backgroundColor: decision === 'Bat' ? '#000000' : '#fff' }}
                                onPress={() => setDecision('Bat')}
                            >
                                <Icon name="cricket" size={30} color={decision === 'Bat' ? '#fff' : '#000'} />
                                <Text style={{ marginTop: 5, fontSize: 18, color: decision === 'Bat' ? '#fff' : '#000' }}>Bat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ padding: 15, borderWidth: 1, borderColor: '#000', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 100, height: 100, backgroundColor: decision === 'Bowl' ? '#000000' : '#fff' }}
                                onPress={() => setDecision('Bowl')}
                            >
                                <Icon name="cricket" size={30} color={decision === 'Bowl' ? '#fff' : '#000'} />
                                <Text style={{ marginTop: 5, fontSize: 18, color: decision === 'Bowl' ? '#fff' : '#000' }}>Bowl</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ marginTop: 10, padding: 5, backgroundColor: '#000000', borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: 300, height: 50 }} onPress={handleNext}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>NEXT</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
        </ImageBackground>
    );
};

export default TossResult;

