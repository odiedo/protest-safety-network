import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import RoutesScreen from './src/screens/RoutesScreen';
import CrowdScreen from './src/screens/CrowdScreen';
import VolunteerScreen from './src/screens/VolunteerScreen';
import CheckpointsScreen from './src/screens/CheckpointsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false  }} 
        />
        <Stack.Screen 
          name="Routes" 
          component={RoutesScreen} 
          options={{ title: 'Protest Routes', headerStyle: { backgroundColor: '#F3E601ff'}}} 
        />
        <Stack.Screen 
          name="Crowd" 
          component={CrowdScreen} 
          options={{ title: 'Crowd Monitoring', headerStyle: { backgroundColor: '#F3E601ff'}}} 
        />
        <Stack.Screen 
          name="Volunteers" 
          component={VolunteerScreen} 
          options={{ title: 'Volunteer Network', headerStyle: { backgroundColor: '#F3E601ff'}}} 
        />
        <Stack.Screen 
          name="Checkpoints" 
          component={CheckpointsScreen} 
          options={{ title: 'Safe Checkpoints', headerStyle: { backgroundColor: '#F3E601ff'}}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
