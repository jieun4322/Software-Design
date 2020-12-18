import React, {Component} from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import Custombutton from "./custombutton";
import * as Application from 'expo-application';
import firebase from "firebase";
import '@firebase/firestore';
import { AppLoading } from 'expo';

export default class Listdata extends Component {
  state = {
    markers: [],
    markersize: 2,
    text: '',
    temp: true,
    isReady: false
  };
  constructor(props) {
    super(props)
  }
  call_from_storage = async() => {
    const db = firebase.firestore();
    //DeviceInfo.getUniqueId().then(async(uniqueId) => {
    //  await db.collection("Users").doc(uniqueId).collection("Translate_recode").get()
    //  .then((snapshot) => {
    //    snapshot.docs.map((doc) => 
    //      doc !== null ? (
    //        data.push([doc.data, "해석"])
    //      ) : null
    //    )
    //  })
    //});
    await db.collection("Users").doc(Application.androidId).collection("Translate_recode").get()
    .then((snapshot) => {
      var list = [];
      snapshot.docs.map((doc) => {
        doc !== null ? (
          list.push([doc.data().data, doc.data().trans])
        ) : null
      })
      this.setState({
        markers: list
      })
    })
    .catch(error => console.log(`error: ${error}`))
  }
  //componentDidMount() {
  //  this.call_from_storage();
  //}
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.call_from_storage}
          onFinish={()=>this.setState({isReady: true})}
          onError={console.warn}
        />
      )
    }
    return (
        <View style={styles.dropmenubar}>
          
            <View style={styles.container}>
              <ScrollView style={styles.Scrollcontainer} maxHeight={1000}>
                  { this.state.markers.map((marker, index)=>{
                    return (
                        <View style={[styles.listlayout]} key={index}>
                              <Custombutton
                                fontSize={25}
                                title={marker[0]}
                                alignItems="center"
                                onPress={() => {Alert.alert("Alert", marker[0])}}
                              />
                              <Custombutton
                                fontSize={15}
                                title={marker[1]}
                                alignItems="center"
                                onPress={() => {Alert.alert("Alert", marker[1])}}
                              />
                        </View>
                    )
                  })}
              </ScrollView>
            </View>
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
    height: 64,
    alignItems: 'center',
    justifyContent: "center"
  },
  mapcontainer: {
    flex: 10
  },
  container: {
    flex: 2,
    backgroundColor: "#A0C6FF",
  },
  Scrollcontainer: {
      flex: 1,
  },
  listlayout: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#A0C6FF"
  },
  texttitlelayout: {
    color: "black",
    marginLeft: 15,
    fontSize: 10,
    width: "75%",
    borderRightWidth: 1,
    borderColor: "#2c2c2c"
  },
  texttimelayout: {
    color: "black",
    marginRight:30,
    fontSize: 15,
  },
});