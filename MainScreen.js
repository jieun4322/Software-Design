import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMapdata from "./MainMapdata";
import Mapdata from "./Mapdata";

const MainStack = createStackNavigator();

export default function MainScreen({ navigation }) {
  return (
    <MainStack.Navigator initialRouteName={MainMapdata}>
      <MainStack.Screen name="MainMapdata" component={MainMapdata} options={{headerShown: false}}   />
      <MainStack.Screen name="Mapdata" component={Mapdata} options={{headerShown: false}} />
    </MainStack.Navigator>
  )
}