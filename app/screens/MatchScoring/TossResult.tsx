

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationProp, RootStackParamList } from './types'; // Adjust the import path as needed

type TossResultRouteProp = RouteProp<RootStackParamList, 'TossResult'>;

const TossResult = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<TossResultRouteProp>();
    const { team1, team2 } = route.params;

    const [tossWinner, setTossWinner] = useState<'Team1' | 'Team2' | null>(null);
    const [decision, setDecision] = useState<'bat' | 'bowl' | null>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleNext = async () => {
        if (!tossWinner || !decision) {
            Alert.alert('Error', 'Please select both toss winner and decision');
            return;
        }

        const winningTeamId = tossWinner === 'Team1' ? team1.id : team2.id;
        const battingTeamId = decision === 'bat' ? winningTeamId : (tossWinner === 'Team1' ? team2.id : team1.id);

        try {
            const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/innings/create_innings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inningsType: "Batting",
                    teamdid_tosswon: winningTeamId
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create innings');
            }

            const data = await response.json();
            console.log('Innings created successfully:', data);

            navigation.navigate('SelectPlayer', {
                battingTeamId,
                bowlingTeamId: battingTeamId === team1.id ? team2.id : team1.id,
            });
        } catch (error) {
            console.error('Error creating innings:', error);
            Alert.alert('Error', 'Failed to create innings. Please try again.');
        }
    };

    return (
        <Animated.View style={{ opacity: fadeAnim, flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 }}>
           <Text style={{ fontSize: 32, marginTop: 10, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' }}>Toss Results</Text>

            <Text style={{ fontSize: 22, marginVertical: 10, textAlign: 'center', fontWeight: 'bold' }}>Who won the toss?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%', marginVertical: 10 }}>
                <TouchableOpacity
                    style={{ padding: 15, borderWidth: 1, borderColor: '#000', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 100, height: 100, backgroundColor: tossWinner === 'Team1' ? '#808080' : '#fff' }}
                    onPress={() => setTossWinner('Team1')}
                >
                    <Text style={{ marginTop: 5, fontSize: 18, color: tossWinner === 'Team1' ? '#fff' : '#000' }}>{team1.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ padding: 15, borderWidth: 1, borderColor: '#000', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 100, height: 100, backgroundColor: tossWinner === 'Team2' ? '#808080' : '#fff' }}
                    onPress={() => setTossWinner('Team2')}
                >
                    <Text style={{ marginTop: 5, fontSize: 18, color: tossWinner === 'Team2' ? '#fff' : '#000' }}>{team2.name}</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 22, marginVertical: 10, textAlign: 'center', fontWeight: 'bold' }}>Decision</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%', marginVertical: 10 }}>
                <TouchableOpacity
                    style={{ padding: 15, borderWidth: 1, borderColor: '#000', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 100, height: 100, backgroundColor: decision === 'bat' ? '#808080' : '#fff' }}
                    onPress={() => setDecision('bat')}
                >
                    <Icon name="cricket" size={30} color={decision === 'bat' ? '#fff' : '#000'} />
                    <Text style={{ marginTop: 5, fontSize: 18, color: decision === 'bat' ? '#fff' : '#000' }}>Bat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ padding: 15, borderWidth: 1, borderColor: '#000', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 100, height: 100, backgroundColor: decision === 'bowl' ? '#808080' : '#fff' }}
                    onPress={() => setDecision('bowl')}
                >
                    <Icon name="cricket" size={30} color={decision === 'bowl' ? '#fff' : '#000'} />
                    <Text style={{ marginTop: 5, fontSize: 18, color: decision === 'bowl' ? '#fff' : '#000' }}>Bowl</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                style={{ 
                    marginTop: 10, 
                    padding: 5, 
                    backgroundColor: '#006aa2', 
                    borderRadius: 10, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: 300, 
                    height: 50 
                }} 
                onPress={handleNext}
            >
                <Text style={{ color: '#fff', fontSize: 18 }}>NEXT</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default TossResult;