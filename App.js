import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import WelcomePage from './src/screen/WelcomePage';
import LoginPage from './src/screen/LoginPage';
import SignupPage from './src/screen/SignupPage';
import HomePage from './src/screen/HomePage';
import NewNotePage from './src/screen/NewNotePage';
import NotePage from './src/screen/NotePage';
import CobaPage from './src/screen/CobaPage';
import ToastComponent from './src/components/ToastComponent';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const getLogin = async () => {
      try {
        // Retrieve the credentials
        const credentials = await Keychain.getInternetCredentials('token');
        if (credentials) {
          console.log(
            'Credentials successfully loaded for user ' + credentials.username,
          );
          axios
            .get('https://catetinnote.herokuapp.com/profile', {
              params: {
                token: credentials.password,
              },
            })
            .then(res => {
              if (res.data.loggedIn) {
                setLogin(true);
                setLoading(true);
              } else {
                setLogin(false);
                setLoading(true);
                Keychain.resetInternetCredentials('token');
              }
            });
        } else {
          console.log('No credentials stored');
          setLogin(false);
          setLoading(true);
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
        setLogin(false);
        setLoading(true);
      }
    };
    getLogin();
    if (loading) {
      SplashScreen.hide();
    }
  }, []);

  const initialState = {
    username: '',
    refresh: true,
  };
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USERNAME':
        return {
          ...state,
          username: action.payload,
        };
      case 'REFRESH':
        return {
          ...state,
          refresh: action.payload,
        };
      default:
        return state;
    }
  };
  const store = configureStore({reducer: rootReducer});
  if (!loading) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="dark-content"
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={login ? 'Home' : 'Welcome'}
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name="Welcome" component={WelcomePage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Signup" component={SignupPage} />
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Note" component={NotePage} />
            <Stack.Screen name="NewNote" component={NewNotePage} />
            <Stack.Screen name="Coba" component={CobaPage} />
          </Stack.Navigator>
        </NavigationContainer>
        <ToastComponent />
      </Provider>
    );
  }
};
export default App;
