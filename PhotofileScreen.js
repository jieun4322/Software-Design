import * as React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Custombutton from './custombutton';
import {AuthContext} from './GlobalVar';
import firebase from "firebase";
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

export default function PhotofileScreen({ navigation }) {
  return (
      <View style={styles.maincontainer}>
          <Text>
          PhotofileScreen
          </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 10
  },
  Topbar: {
    flex: 2,
    color: "black",
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: "center",
  },
  mapcontainer: {
    flex: 10
  },
  container: {
    flex: 13,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    //borderTopWidth: 2,
    //borderColor: "#2c2c2c",
     padding: 15
  },
  menubar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  checkbutton: {
    flex: 1,
    width: '60%',
    color: "#3F3D3F",
    justifyContent: 'center',
    fontSize: 28,
    fontWeight: "300",
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5
  },
  Settingbutton: {
    height: "8%",
    marginBottom:8,
    borderBottomWidth: 1,
    //borderWidth: 1,
    borderColor: "#939393",
    fontSize: 25,
  },
});