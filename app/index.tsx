import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabsBeginning from './screens/Navigation/AppTabsBeginning';
import AppTabs from './screens/Navigation/AppTabs';
import HomeScreen from './screens/HomeScreen';
import LoginPage from './screens/LoginScreens/LoginPage';
import PlayerSignUp from './screens/LoginScreens/PlayerSignUp';
import ScorerSignUp from './screens/LoginScreens/ScorerSignup';
import YouAre from './screens/LoginScreens/YouAre';
import LiveMatches from './screens/LiveMatches';
import MatchDetails from './screens/MatchScoring/MatchDetails';
import Profile from './screens/Profile';
import YourMatches from './screens/YourMatches';
import TeamRegistration from './screens/MatchScoring/TeamRegistration';
import SelectPlayer from './screens/MatchScoring/SelectPlayer';
import ScoreInput from './screens/MatchScoring/ScoreInput';
import YourMatchesPlayer from './screens/YourMatchesPlayer';
import LoginPagePlayer from './screens/LoginScreens/LoginPagePlayer';
import AppTabsBeginningPlayer from './screens/Navigation/AppTabsBeginningPlayer';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="PlayerSignUp" component={PlayerSignUp} />
        <Stack.Screen name="ScorerSignUp" component={ScorerSignUp} />
        <Stack.Screen name="YouAre" component={YouAre} />
        <Stack.Screen name="AppTabsBeginning" component={AppTabsBeginning} />
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="LiveMatches" component={LiveMatches} />
        <Stack.Screen name="YourMatches" component={YourMatches} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MatchDetails" component={MatchDetails} />
        <Stack.Screen name="TeamRegistration" component={TeamRegistration} />
        <Stack.Screen name="SelectPlayer" component={SelectPlayer} />
        <Stack.Screen name="ScoreInput" component={ScoreInput} />
        <Stack.Screen name="YourMatchesPlayer" component={YourMatchesPlayer} />
        <Stack.Screen name="LoginPagePlayer" component={LoginPagePlayer} />
        <Stack.Screen name="AppTabsBeginningPlayer" component={AppTabsBeginningPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;