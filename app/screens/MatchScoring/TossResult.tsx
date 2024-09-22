// import React, { useState } from 'react'; // Import useState from react
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  // Import the icon library
// import { NavigationProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';

// const TossResult = () => {
//     const navigation = useNavigation();
//     const [tossWinner, setTossWinner] = useState<'Team1' | 'Team2' | null>(null);
//     const [decision, setDecision] = useState<'bat' | 'bowl' | null>(null);

//     const handlenext = () => {
//         // Handle navigation to the next screen and pass the match details
//         navigation.navigate('ScoreInput');
//     };   

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Toss Results</Text>

//             <Text style={styles.subTitle}>Who won the toss?</Text>
//             <View style={styles.optionsContainer}>
//                 <TouchableOpacity
//                     style={[
//                         styles.optionButton,
//                         tossWinner === 'Team1' && styles.selectedButton,
//                     ]}
//                     onPress={() => setTossWinner('Team1')}
//                 >
//                     <Text style={styles.optionText}>Team 1</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[
//                         styles.optionButton,
//                         tossWinner === 'Team2' && styles.selectedButton,
//                     ]}
//                     onPress={() => setTossWinner('Team2')}
//                 >
//                     <Text style={styles.optionText}>Team 2</Text>
//                 </TouchableOpacity>
//             </View>

//             <Text style={styles.subTitle}>Decision</Text>
//             <View style={styles.optionsContainer}>
//                 <TouchableOpacity
//                     style={[
//                         styles.optionButton,
//                         decision === 'bat' && styles.selectedButton,
//                     ]}
//                     onPress={() => setDecision('bat')}
//                 >
//                     <Icon name="cricket" size={30} color={decision === 'bat' ? '#fff' : '#000'} />
//                     <Text style={styles.optionText}>Bat</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[
//                         styles.optionButton,
//                         decision === 'bowl' && styles.selectedButton,
//                     ]}
//                     onPress={() => setDecision('bowl')}
//                 >
//                     <Icon name="cricket" size={30} color={decision === 'bowl' ? '#fff' : '#000'} />
//                     <Text style={styles.optionText}>Bowl</Text>
//                 </TouchableOpacity>
//             </View>
//             <View>
//             <Button title="score" onPress={handlenext} />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//     },
//     title: {
//         fontSize: 24,
//         marginBottom: 20,
//     },
//     subTitle: {
//         fontSize: 18,
//         marginVertical: 10,
//     },
//     optionsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         width: '80%',
//         marginVertical: 10,
//     },
//     optionButton: {
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#000',
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     selectedButton: {
//         backgroundColor: '#000',
//     },
//     optionText: {
//         marginTop: 5,
//         fontSize: 16,
//         color: '#000',
//     },
//     navigateButton: {
//         marginTop: 20,
//         padding: 15,
//         backgroundColor: '#007bff',
//         borderRadius: 5,
//     },
//     navigateButtonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
// });

// export default TossResult;

// screens/TossResult.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TossResult = () => {
    const navigation = useNavigation();
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

    return (
        <Animated.View style={{ opacity: fadeAnim, flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 }}>
           <Text style={{ fontSize: 32, marginTop: 10, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' }}>Toss Results</Text>

            <Text style={{ fontSize: 22, marginVertical: 10, textAlign: 'center', fontWeight: 'bold' }}>Who won the toss?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%', marginVertical: 10 }}>
                <TouchableOpacity
                    style={{ padding: 15, borderWidth: 1, borderColor: '#000', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 100, height: 100, backgroundColor: tossWinner === 'Team1' ? '#808080' : '#fff' }}
                    onPress={() => setTossWinner('Team1')}
                >
                    <Text style={{ marginTop: 5, fontSize: 18, color: tossWinner === 'Team1' ? '#fff' : '#000' }}>Team 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ padding: 15, borderWidth: 1, borderColor: '#000', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 100, height: 100, backgroundColor: tossWinner === 'Team2' ? '#808080' : '#fff' }}
                    onPress={() => setTossWinner('Team2')}
                >
                    <Text style={{ marginTop: 5, fontSize: 18, color: tossWinner === 'Team2' ? '#fff' : '#000' }}>Team 2</Text>
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
            <TouchableOpacity style={{ marginTop: 10, padding: 5, backgroundColor: '#006aa2', borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: 300, height: 50 }} onPress={() => navigation.navigate('SelectPlayer')}>
                <Text style={{ color: '#fff', fontSize: 18 }}>NEXT</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default TossResult;