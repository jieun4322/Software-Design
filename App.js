
/*
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
import { SimpleLineIcons } from '@expo/vector-icons';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
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
*//*

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
        /*case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };*//*
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
  /*
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
  *//*
  const authContext = React.useMemo( () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: async data => dispatch({ type: 'SIGN_OUT' })
    }),
    []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar barStyle= "dark"/>
        {state.userToken != null ?
        (<Tab.Navigator initialRouteName={MainScreen} screenOptions={({route}) => ({tabBarVisible: isTabBarVisible(route)})}>
           <Tab.Screen 
            name="ListScreen" 
            component={ListScreen} 
            options={{
              tabBarLabel: " ",
              tabBarIcon: ({ color, size }) => (
                <SimpleLineIcons name="menu" size={24} color="black" />
                //<Icon name="ios-list" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen 
            name="MainScreen" 
            component={MainScreen} 
            options={{
              tabBarLabel: " ",
              tabBarIcon: ({ color, size }) => (
                <SimpleLineIcons name="home" size={30} color="black" />
                //<Icon name="home-outline" color={color} size={size} />
              )
            }}
          />
         
          <Tab.Screen 
            name="Settingdata" 
            component={Settingdata} 
            options={{
              tabBarLabel: " ",
              tabBarIcon: ({ color, size }) => (
                <Feather name="more-horizontal" size={30} color="black" />
               // <Icon name="ios-more" color={color} size={size} />
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
}*/

import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar, Alert, AsyncStorage, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StartScreen from "./StartScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import TranslatorScreen from './TranslatorScreen';
import ListScreen from "./ListScreen";
import Othersdata from './Othersdata';
import SettingScreen from './SettingScreen';
import VocaScreen from "./VocaScreen";
import {AuthContext} from './GlobalVar';
import Icon from "react-native-vector-icons/Ionicons";
import { SimpleLineIcons } from '@expo/vector-icons';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native';
const Drawer = createDrawerNavigator();

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerNavigationProp,
} from '@react-navigation/drawer';

const DrawNavi = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="TranslatorScreen" 
        component={TranslatorScreen} 
        options={{
          drawerLabel: '번역', 
          drawerIcon: ({ focused, color, size }) => <SimpleLineIcons color={color} size={size} name= 'doc' />
        }}
     />
      <Drawer.Screen 
        name="VocaScreen" 
        component={VocaScreen} 
        options={{
          drawerLabel: '단어장', 
          drawerIcon: ({ focused, color, size }) => <SimpleLineIcons color={color} size={size} name='note' />
        }}
      />
      <Drawer.Screen 
        name="ListScreen" 
        component={ListScreen} 
        options={{
          drawerLabel: '번역 기록', 
          drawerIcon: ({ focused, color, size }) => <SimpleLineIcons color={color} size={size} name='book-open' />
        }}
      />
      <Drawer.Screen 
        name="SettingScreen" 
        component={SettingScreen} 
        options={{
          drawerLabel: '설정', 
          drawerIcon: ({ focused, color, size }) => <SimpleLineIcons color={color} size={size} name='wrench' />
        }}
      />
    </Drawer.Navigator>
  ); 
};

const DrawStackNavi = ({ navigation }) => {
  return (
    <newStack.Navigator
      screenOptions={({route}) => ({
        tabBarVisible: isTabBarVisible(route),
        headerShown: true, 
        headerLeft: (props) => (
          <IconButton
            icon="menu"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            color="black"
          />
        )
      })}
    >
      <newStack.Screen name="Real Life Word" component={DrawNavi} options={{headerTitleAlign: "center", headerTitleStyle: { fontWeight: 'bold'}}} />
    </newStack.Navigator>
  )
}

const isTabBarVisible = (route) => {
  const routeName = route.state
      ? route.state.routes[route.state.index].name
      : (route.params ? route.params.screen : "MainScreen");
  return !['CameraScreen'].includes(routeName);
}

const newStack = createStackNavigator();
const Stack = createStackNavigator();

export default function App({ route, navigation }) {
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
  /*
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
  */
  const authContext = React.useMemo( () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: async data => dispatch({ type: 'SIGN_OUT' })
    }),
    []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar barStyle= "default"/>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="DrawStackNavi" component={DrawStackNavi} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
