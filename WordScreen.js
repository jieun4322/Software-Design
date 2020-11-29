import React, { Component, useCallback} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import CustomButton from './custombutton';
import MapView, { PROVIDER_GOOGLE, Marker, UrlTile, Polyline } from 'react-native-maps';
import * as Location from "expo-location";
import axios from 'axios';

export default class WordScreen extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
        <View style={styles.dropmenubar}>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  dropmenubar: {
    flex: 10
  },
  dropmenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  mapcontainer: {
    flex: 10
  },
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 4,
    //borderBottomWidth: 4,
    borderColor: "#A0C6FF"
  },
  menubar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#A0C6FF"
  },
  checkbutton: {
    width: '40%',
    height: "30%",
    color: "#FFFFFF",
    fontSize: 24,
    borderWidth: 3,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    borderColor: "#A0C6FF"
  },
  loadingcontainer: {
      flex: 1
  }
});