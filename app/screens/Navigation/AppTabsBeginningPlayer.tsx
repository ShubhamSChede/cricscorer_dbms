import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Profile';
import LiveMatches from '../LiveMatches';
import YourMatchesPlayer from '../YourMatchesPlayer';
import { FontAwesome5 } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

function AppTabsBeginning() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} >
            <Tab.Screen 
                name="LiveMatches"  
                component={LiveMatches}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="edit" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="YourMatchesPlayer" 
                component={YourMatchesPlayer}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="list-alt" color={color} size={size} />
                    ),
                }}
            />
             <Tab.Screen 
                name="Profile" 
                component={Profile}
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