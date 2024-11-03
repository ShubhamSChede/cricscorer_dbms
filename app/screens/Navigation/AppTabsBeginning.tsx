import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Profile';
import LiveMatchesSpectator from '../LiveMatchesSpectator';
import YourMatches from '../YourMatches';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function AppTabsBeginning() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} >
            <Tab.Screen 
                name="LiveMatchesSpectator"  
                component={LiveMatchesSpectator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="edit" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="YourMatches" 
                component={YourMatches}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="list-alt" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppTabsBeginning;