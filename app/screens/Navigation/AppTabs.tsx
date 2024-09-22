import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScoreInput from '../MatchScoring/ScoreInput';
import ScoreCard from '../ScoreCard';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} >
            <Tab.Screen 
                name="ScoreInput"  
                component={ScoreInput}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="edit" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="ScoreCard" 
                component={ScoreCard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="list-alt" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppTabs;