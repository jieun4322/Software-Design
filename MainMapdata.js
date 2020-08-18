import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import CustomButton from './custombutton';
import MapView, { PROVIDER_GOOGLE, Marker, UrlTile } from 'react-native-maps';
import * as Location from "expo-location";

export default class MainScreen extends Component {
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
    backgroundColor: "#48FFFF",
    borderTopWidth: 2,
    borderColor: "#FFCCFF"
  },
  menubar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#48FFFF"
  },
  checkbutton: {
    width: '60%',
    height: "50%",
    color: "#2c2c2c",
    justifyContent: 'center',
    fontSize: 24,
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    borderColor: "#FFCCFF"
  },
});