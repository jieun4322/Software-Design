import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from "./MainScreen";
import TranslationScreen from "./TranslationScreen";
import PhotofileScreen from "./PhotofileScreen";
import CameraScreen from "./CameraScreen";

const MainStack = createStackNavigator();

export default function TranslatorScreen({ navigation }) {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}} initialRouteName={MainScreen}>
      <MainStack.Screen name="MainScreen" component={MainScreen} />
      <MainStack.Screen name="TranslationScreen" component={TranslationScreen} />
      <MainStack.Screen name="PhotofileScreen" component={PhotofileScreen} />
      <MainStack.Screen name="CameraScreen" component={CameraScreen} />
    </MainStack.Navigator>
  )
}