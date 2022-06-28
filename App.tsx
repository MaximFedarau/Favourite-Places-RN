//React
import React from 'react';

// Expo
import { StatusBar } from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons';

//Constants
import { PRIMARY_200, GRAY_700 } from './constants/colors';
import { SCREEN_NAMES } from './constants/constants';
import { NavigationProps } from './constants/constants';
import { init } from './utils/db';

//Screens
import Home from './screens/Home/Home.screen';
import AddPlace from './screens/AddPlace/AddPlace.screen';
import Map from './screens/Map/Map.screen';
import Details from './screens/Details/Details.screen';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  React.useEffect(() => {
    init();
  },[])

  return (
    <>
    <StatusBar style='light' />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: PRIMARY_200},
          contentStyle: {
            backgroundColor: GRAY_700,
          }
      }}>
        <Stack.Screen name={SCREEN_NAMES.HOME} options={({navigation}:{navigation: NavigationProps}) => ({title: 'Your Favourite Places',
        headerRight: ({tintColor}) => {
            function onPressHandler() {
              navigation.navigate(SCREEN_NAMES.ADD_PLACE);
            }
            return <Ionicons name='add' size={24} color={tintColor} onPress={onPressHandler} />
          }})} component={Home} />
        <Stack.Screen name={SCREEN_NAMES.ADD_PLACE} options={{title: 'Add a new Place',}} component={AddPlace} />
        <Stack.Screen name={SCREEN_NAMES.MAP} options={{title: 'Map'}} component={Map} />
        <Stack.Screen name={SCREEN_NAMES.DETAILS} options={{title: 'Details'}} component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
