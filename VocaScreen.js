import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainvocaScreen from "./MainvocaScreen";
import WordScreen from "./WordScreen";

const MainStack = createStackNavigator();

export default function VocaScreen({ navigation }) {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}} initialRouteName={MainvocaScreen}>
      <MainStack.Screen name="MainvocaScreen" component={MainvocaScreen} />
      <MainStack.Screen name="WordScreen" component={WordScreen} />
    </MainStack.Navigator>
  )
}