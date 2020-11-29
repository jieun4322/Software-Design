import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import CustomButton from './custombutton';
import MapView, { PROVIDER_GOOGLE, Marker, UrlTile } from 'react-native-maps';
import * as Location from "expo-location";

export default class MainMapdata extends Component {
  state = {
    region: {
      latitude: 37.4219857,
      longitude: -122.0840379,
      latitudeDelta: 0.009,
      longitudeDelta: 0.004,
    },
    text: '',
    temp: true,
    bottomMargin: 0,
  };
  constructor(props) {
    super(props);
  };
  getLocation = async() => {
    try{
      await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.setState( (nowstate) => ({
          region: {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.004
          }
      }))
    }
    catch(error){
      Alert.alert("Can't find you.","So sad");
    }
};
  componentDidMount() {
    this.getLocation();
  }
  render() {
    var data = [["Date 1","Date 2","Date 3","Date 4","Date 5","Date 6","Date 7","Date 8","Date 9","Date 10"]];
    return (
        <View style={styles.dropmenubar}>
        <View style={styles.title}>
        <Text style={{fontSize:25,color:'black'}}>Today Traffic Line</Text>
        </View>
          <MapView
              style={{marginBottom: this.state.bottomMargin,...styles.mapcontainer}}
              provider={PROVIDER_GOOGLE}
              ref={ map => { this.map = map }}
              region={this.state.region}
              onMapReady={() => this.setState({ bottomMargin: 1 })}
              showsUserLocation={true}
              showsMyLocationButton={true}
          >
          {
            // <UrlTile
            // urlTemplate={this.state.urlTemplate}
            // maximumZ={19}
            // flipY={false}
            // /> 
          }
          </MapView>
            <View style={styles.container}>
              <View style={styles.checkbutton}>
                <CustomButton
                  title={ "Detail map info" } 
                  alignItems="center"
                  onPress={() => {
                    Alert.alert("Alert","Detail"), 
                    this.props.navigation.navigate("Mapdata")
                  }}
                />
              </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  dropmenubar: {
    flex: 4
  },
  dropmenu: {
    flex: 4,
    alignItems: 'center',
    justifyContent: "center"
  },
  title: {
    width:'100%',
    height:'30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
  },
  mapcontainer: {
    flex: 4
  },
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 4,
    
    borderColor: "#A0C6FF"
  },
  menubar: {
    flex: 2,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  checkbutton: {
    width: '40%',
    height: "20%",
    color: "#FFFFFF",
    justifyContent: 'center',
    fontSize: 24,
    borderWidth: 3,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    borderColor: "#A0C6FF"
  },
});