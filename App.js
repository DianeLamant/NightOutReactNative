import React, { useReducer, useContext } from 'react';
import { initialState, reducer, GlobalState } from './components/store';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './components/pages/Login';
import Register from './components/pages/Register';

import Nav from './components/pages/Nav';
import Filters from './components/pages/Filters';
import AddPlace from './components/pages/AddPlace';

export default function Reducer () {

  const [ state, dispatch ] = useReducer(reducer, initialState);

  return <>
      <GlobalState.Provider value={{state, dispatch}}>
          <App />
      </GlobalState.Provider>

  </>
}

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'lightblue',
    accent: 'blue',
    background: 'transparent',
  },
};

function App() {

  const { state: { isLogged } } = useContext(GlobalState);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {isLogged ?
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Nav} options={headerStyle} />
          <Stack.Screen name="Filters" component={Filters} options={headerStyle} />
          <Stack.Screen name="AddPlace" component={AddPlace} options={headerStyle} />
        </Stack.Navigator>
        :
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={headerStyle} />
          <Stack.Screen name="Register" component={Register} options={headerStyle} />
        </Stack.Navigator>

        }
      </NavigationContainer>
    </PaperProvider>
  );
}

const headerStyle = {
  title: 'NightOut',
  headerStyle: {
    backgroundColor: 'lightblue',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  },
};

