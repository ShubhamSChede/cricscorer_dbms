import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Profile';
import LiveMatches from '../LiveMatches';
import YourMatchesPlayer from '../YourMatchesPlayer';
import { FontAwesome5 } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function AppTabsBeginningPlayer() {
  const route = useRoute<RouteProp<{ params: { playerDetails: any } }, 'params'>>();
  const { playerDetails } = route.params;

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
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
        initialParams={{ playerDetails }} // Pass player details as initial params
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list-alt" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppTabsBeginningPlayer;