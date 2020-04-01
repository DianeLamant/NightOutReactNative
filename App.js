import React, { useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './components/pages/Login';
import Register from './components/pages/Register';

import Nav from './components/pages/Nav';
import Filters from './components/pages/Filters';
import AddPlace from './components/pages/AddPlace';

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

export default function App() {

  const [ isLogged, setIsLogged ] = useState(false)

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {isLogged ?
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Nav} options={headerStyle} />
          <Stack.Screen name="Filters" component={Filters} />
          <Stack.Screen name="AddPlace" component={AddPlace} />
        </Stack.Navigator>
        :
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" options={headerStyle}>
            {props => <Login {...props} setIsLogged={setIsLogged} />}
          </Stack.Screen>
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

