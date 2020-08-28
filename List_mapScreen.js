import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import CustomButton from './custombutton';
import MapView, { PROVIDER_GOOGLE, Marker, UrlTile } from 'react-native-maps';
import axios from "axios";

export default function List_mapScreen({ route, navigation }) {
  const { address, time } = route.params;
  const [location, getlocate] = useState({
    lat: 37.4219857,
    lng: -122.0840379,
  })
  React.useEffect(() => {
    const getLocation = async() => {
      var address_data = address.split(" ").join("+");
      await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address_data}&key=AIzaSyBJjeb1CqkQ6HQL8uHr1ottRRNLuLm11Ws`)
        .then(response => {getlocate(response.data.results[0].geometry.location)});
    };
    try {
        getLocation();
    } catch(error) {
        Alert.alert("Error!","Can't find this place");
    }
  }, []);
  return (
    <View style={styles.dropmenubar}>
      <MapView
          style={styles.mapcontainer}
          provider={PROVIDER_GOOGLE}
          region={{latitude: location.lat, longitude: location.lng, latitudeDelta: 0.009, longitudeDelta: 0.004}}
      >
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lng
          }}
          title={address.substring(5,)}
          description={time}
        /> 
      {
        // <UrlTile
        // urlTemplate={this.state.urlTemplate}
        // maximumZ={19}
        // flipY={false}
        // /> 
      }
      </MapView>
      <View style={styles.textcontainer}>
        <View style={{marginBottom: 10}}><Text style={styles.MainText}>{address.substring(5,)}</Text></View>
        <Text style={{color:'#960101',fontSize:15}}>확진자 방문시각: {time}</Text>
      </View>
    </View>
  );
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
    flex: 13
  },
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#FFCCFF"
  },
  menubar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#48FFFF"
  },
 
  textcontainer: {
      flex: 2,
      padding: 25,
      backgroundColor: "white",
      borderTopWidth: 6,
      borderColor: "#A0C6FF"
  },
  MainText: {
    fontSize: 21,
  },
  SubText: {
    fontSize: 18,
  }
});