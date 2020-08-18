import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar, Alert, AsyncStorage, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StartScreen from "./StartScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import MainScreen from './MainScreen';
import ListScreen from "./ListScreen";
import Othersdata from './Othersdata';
import Settingdata from './Settingdata';
import {AuthContext} from './GlobalVar';
import Icon from "react-native-vector-icons/Ionicons";
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

/*
const LOCATION_TASK_NAME = 'background-location-task';

export default class App extends React.Component {
  
  
  
  

  onPress = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 3000,
        distanceInterval: 1
      });
    }
  };
  render() {
    return (
      <>
        <StatusBar barStyle="auto" />
        <TouchableOpacity onPress={this.onPress}>
          <Text>Enable background location</Text>
        </TouchableOpacity>
      </>
    );
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    Alert.alert(error, "error occured");
    return;
  }
  if (data) {
    const { locations } = data;
    console.log(locations);
  }
});
*/

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App({ route, Navigation }) {
  const isTabBarVisible = (route) => {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : (route.params ? route.params.screen : "MainScreen");
    return !['List_mapScreen'].includes(routeName);
  }
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        Alert.alert("Error!","Restoring token failed");
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo( () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar barStyle="auto" />
        {state.userToken != null ?
        (<Tab.Navigator initialRouteName={MainScreen} screenOptions={({route}) => ({tabBarVisible: isTabBarVisible(route)})}>
          <Tab.Screen 
            name="MainScreen" 
            component={MainScreen} 
            options={{
              tabBarLabel: "Main",
              tabBarIcon: ({ color, size }) => (
                <Icon name="ios-map" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen 
            name="ListScreen" 
            component={ListScreen} 
            options={{
              tabBarLabel: "List",
              tabBarIcon: ({ color, size }) => (
                <Icon name="ios-list" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen 
            name="Othersdata" 
            component={Othersdata} 
            options={{
              tabBarLabel: "Others",
              tabBarIcon: ({ color, size }) => (
                <Icon name="ios-add" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen 
            name="Settingdata" 
            component={Settingdata} 
            options={{
              tabBarLabel: "Setting",
              tabBarIcon: ({ color, size }) => (
                <Icon name="ios-settings" color={color} size={size} />
              )
            }}
          />
        </Tab.Navigator>
        ) : (
        <Stack.Navigator initialRouteName={StartScreen}>
          <Stack.Screen name="Start" component={StartScreen} options={{title: 'Sign in',animationTypeForReplace: state.isSignout ? 'pop' : 'push'}}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}