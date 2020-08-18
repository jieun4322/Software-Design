import React, { Component, useCallback} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import CustomButton from './custombutton';
import MapView, { PROVIDER_GOOGLE, Marker, UrlTile, Polyline } from 'react-native-maps';
import * as Location from "expo-location";
import axios from 'axios';

export default class Mapdata extends Component {
  state = {
    region: {
      latitude: 37.4219857,
      longitude: -122.0840379,
      latitudeDelta: 0.009,
      longitudeDelta: 0.004,
    },
    markers: [{
      latlng:{
        latitude:37.562516,
        longitude:127.035679
      },
      title:"희망약국",
      description:"왕십리에 있는 약국"
    },
    {
      latlng:{
        latitude:37.562516,
        longitude:127.037
      },
      title:"희망약국2",
      description:"왕십리에 있는 약국"
    }],
    coordinate: [],
    coordinate2: [{
      latitude: 35.8768,
      longitude: 128.6554
    },
    {
      latitude: 35.8793,
      longitude: 128.6232
    },
    {
      latitude: 35.8714,
      longitude: 128.5822
    }],
    coordinate3: [{
      latitude: 35.8897,
      longitude: 128.6127
    },
    {
      latitude: 35.8690,
      longitude: 128.6186
    },
    {
      latitude: 35.8638,
      longitude: 128.5944
    }],
    text: '',
    temp: true,
    bottomMargin: 0,
    urlTemplate: "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
  };
  constructor(props) {
    super(props);
  };
  options = {
    enableHighAccuracy: true, 
    // distanceInterval: 2000,
    // timeInterval: 200000,
    maximumAge: 2000, 
    timeout: 27000
  };
  getLocation = async() => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      this.watchID = await Location.watchPositionAsync(this.options, async(position)=>{
        const {latitude, longitude} = position.coords
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude + ',' + position.coords.longitude}&sensor=true&key=AIzaSyBJjeb1CqkQ6HQL8uHr1ottRRNLuLm11Ws`)
          .then(response => {

            this.setState((nowstate)=>({
              region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.004,
              },
              coordinate: [
                ...nowstate.coordinate, {
                  latitude: latitude,
                  longitude: longitude
                }
              ],
              markers: [
                ...nowstate.markers, {
                  latlng: {
                    latitude: latitude,
                    longitude: longitude
                  },
                  title: response.data.results[0].formatted_address,
                  description: response.data.results[0].formatted_address
                }
              ]
            }))
          })
      });
    }
};
  /*
  getLocation = async() => {
      await Location.requestPermissionsAsync();
      var latlng = {
        latitude: this.state.region.latitude, 
        longitude: this.state.region.longitude
      };
      var responses = {};
      this.watchID = await Location.watchPositionAsync(this.options, (position)=>{
        console.log(position)
        latlng = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
      await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.latitude + ',' + latlng.longitude}&sensor=true&key=AIzaSyBJjeb1CqkQ6HQL8uHr1ottRRNLuLm11Ws`)
          .then(response => {
            console.log(response),
            responses = response
          })
      this.setState((nowstate)=>({
        region: {
          latitude: latlng.latitude,
          longitude: latlng.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.004,
        },
        coordinate: [
          ...nowstate.coordinate, {
            latitude: latlng.latitude,
            longitude: latlng.longitude
          }
        ],
        markers: [
          ...nowstate.markers, {
            latlng: {
              latitude: latlng.latitude,
              longitude: latlng.longitude
            },
            title: responses.data.result,
            description: responses.data.result
          }
        ]
      }))
  };
  */
  /*
 getLocation = async() => {
  await Location.requestPermissionsAsync();
  this.watchID = await Location.watchPositionAsync(this.options, (position)=>{
    console.log(position)
    const {latitude, longitude} = position.coords;
    this.setState((nowstate)=>({
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.004,
      },
      coordinate: [
        ...nowstate.coordinate, {
          latitude: latitude,
          longitude: longitude
        }
      ],
      markers: [
        ...nowstate.markers, {
          latlng: {
            latitude: latitude,
            longitude: longitude
          },
          title: " ",
          description: " "
        }
      ]
    }))
  });
  };
  /*
  getsnaptoload = async() => {
    var data = this.state.Array.map( (Arraydata) => (
      Arraydata.latitude + ',' + Arraydata.longitude
    ))
    await axios.get(`https://roads.googleapis.com/v1/snapToRoads?path=-35.27801,149.12958|-35.28032,149.12907|-35.28099,149.12929|-35.28144,149.12984|-35.28194,149.13003|-35.28282,149.12956|-35.28302,149.12881|-35.28473,149.12836&interpolate=true&key=AIzaSyBJjeb1CqkQ6HQL8uHr1ottRRNLuLm11Ws`)
    .then(response => {
      this.setState(() => ({
        Array: response.data.snappedPoints
      }))
    })
    var data2 = this.state.Array.map(arraydata => (
      arraydata.location
    ))
    this.setState(() =>  ({
      Arrays: data2
    }))
    console.log(this.state.Arrays)
  }*/
  componentDidMount() {
    this.getLocation();
    // this.getsnaptoload();
  }
  componentWillUnmount() {
     this.watchID.remove();
  }
  render() {
    var data = [["Date 1","Date 2","Date 3","Date 4","Date 5","Date 6","Date 7","Date 8","Date 9","Date 10"]];
    return (
        <View style={styles.dropmenubar}>
        <DropdownMenu
          style={styles.dropmenu}
          bgColor={'white'}
          tintColor={'#2c2c2c'}
          activityTintColor={'green'}
          // arrowImg={}
          // checkImage={}
          optionTextStyle={{color: '#333333', fontSize: 25}}
          titleStyle={{color: '#333333', fontSize: 25}} 
          maxHeight={300}
          handler={(selection, row) => this.setState( (nowstate) => ({
            region: nowstate.region,
            markers: nowstate.markers,
            text: data[selection][row], 
            temp: false 
          }))}
          data={data}
        >
          <MapView
              style={{marginBottom: this.state.bottomMargin,...styles.mapcontainer}}
              provider={PROVIDER_GOOGLE}
              ref={ map => { this.map = map }}
              region={this.state.region}
              onMapReady={() => this.setState({ bottomMargin: 1 })}
              showsUserLocation={true}
              showsMyLocationButton={true}
          >
          <Marker draggable
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude
            }}
            title="My home"
            description="My home example"
            onDragEnd={(e) => this.setState({x: e.nativeEvent.coordinate})}
          />
          { this.state.markers.map((marker,index)=>{
               return <Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                        key={index}
                      />
          })}
          {
            // <UrlTile
            // urlTemplate={this.state.urlTemplate}
            // maximumZ={19}
            // flipY={false}
            // /> 
          }
          <Polyline 
            coordinates={this.state.coordinate2}
            strokeColor="blue"
            strokeWidth={4}
            tappable={true}
            onPress={ () => Alert.alert("blue", "load") }
          />
          <Polyline 
            coordinates={this.state.coordinate3}
            strokeColor={"red"}
            strokeWidth={4}
            tappable={true}
            onPress={ () => Alert.alert("red", "load") }
          />
          <Polyline 
            coordinates={this.state.coordinate}
            strokeColor={"black"}
            strokeWidth={4}
            tappable={true}
            onPress={ () => Alert.alert("black", "load") }
          />
          </MapView>
            <View style={styles.container}>
              <View style={styles.checkbutton}>
                <CustomButton 
                  title={ "Go MainScreen" }
                  onPress={() => {
                    Alert.alert("Alert","go back"),
                    this.props.navigation.pop()
                  }}
                />
              </View>
            </View>
          </DropdownMenu>
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
    borderBottomWidth: 2,
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
    fontSize: 24,
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    borderColor: "#FFCCFF"
  },
  loadingcontainer: {
      flex: 1
  }
});