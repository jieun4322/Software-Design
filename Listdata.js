import React, {Component} from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import Custombutton from "./custombutton";

export default class Listdata extends Component {
  state = {
    markers: [{
        title:"대한민국 대구광역시 북구 산격동 1327-15",
        time: "00:00",
        titlekey: "17",
        timekey: "18",
        backgroundColor: "#FFDFD8",
      },
      {
        title:"대한민극 대구광역시 북구 대현동 261-1",
        time: "01:00",
        titlekey: "19",
        timekey: "20",
        backgroundColor: "white",
      },
      {
        title:"대한민국 대구광역시 동구 신암1동 신암북로7길 36-25",
        time: "02:00",
        titlekey: "21",
        timekey: "22",
        backgroundColor: "#FFDFD8",
      },
      {
        title:"대한민국 대구광역시 중구 성내2동 87-2",
        time: "03:00",
        titlekey: "23",
        timekey: "24",
        backgroundColor: "white",
      },
      {
        title:"대한민국 대구광역시 신천3동 19-1",
        time: "04:00",
        titlekey: "25",
        timekey: "26",
        backgroundColor: "white",
      },
      {
        title:"대한민국 대구광역시 북구 산격동 1185-1",
        time: "05:00",
        titlekey: "27",
        timekey: "28",
        backgroundColor: "#FFDFD8",
      },
      {
        title:"대한민국 대구광역시 동구 신암4동 294-3",
        time: "06:00",
        titlekey: "29",
        timekey: "30",
        backgroundColor: "white",
      },
      {
        title:"대한민국 대구광역시 북구 복현동 539-86",
        time: "07:00",
        titlekey: "31",
        timekey: "32",
        backgroundColor: "white",
      },
      {
        title:"대한민국 대구광역시 북구 칠성동2가 302-155",
        time: "08:00",
        titlekey: "33",
        timekey: "34",
        backgroundColor: "white",
      },
      {
        title:"대한민국 대구광역시 중구 북성로2가 19-3",
        time: "09:00",
        titlekey: "35",
        timekey: "36",
        backgroundColor: "#FFDFD8",
      },
      {
        title:"대한민국 대구광역시 동구 신암4동 578-3",
        time: "10:00",
        titlekey: "37",
        timekey: "38",
        backgroundColor: "white",
      },
      {
        title:"대한민국 대구광역시 동구 신천4동 386-2",
        time: "11:00",
        titlekey: "39",
        timekey: "40",
        backgroundColor: "white",
      }],
    markersize: 2,
    text: '',
    temp: true
  };
  constructor(props) {
    super(props)
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
          handler={(selection, row) => this.setState({
            text: data[selection][row], 
            temp: false 
          })}
          data={data}
        >
            <View style={styles.container}>
              <ScrollView style={styles.Scrollcontainer} maxHeight={1000}>
                  { this.state.markers.map((marker, index)=>{
                    return (
                        <View style={[styles.listlayout, {backgroundColor: marker.backgroundColor}]} key={index}>
                            <View style={styles.texttitlelayout} key={marker.titlekey}>
                              <Custombutton
                                fontSize={25}
                                title={marker.title}
                                alignItems="flex-start"
                                buttonColor={marker.backgroundColor}
                                onPress={() => {Alert.alert("Alert", marker.title), this.props.navigation.navigate("List_mapScreen",{address:marker.title, time:marker.time})}}
                              />
                            </View>
                            <Text style={styles.texttimelayout} key={marker.timekey}>
                              {marker.time}
                            </Text>
                        </View>
                    )
                  })}
              </ScrollView>
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
    height: 64,
    alignItems: 'center',
    justifyContent: "center"
  },
  mapcontainer: {
    flex: 10
  },
  container: {
    flex: 2,
    backgroundColor: "#48FFFF",
    borderTopWidth: 2,
    borderColor: "#FFCCFF"
  },
  Scrollcontainer: {
      flex: 1,
  },
  listlayout: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#FFCCFF"
  },
  texttitlelayout: {
    color: "black",
    marginLeft: 20,
    fontSize: 25,
    width: "70%",
    borderRightWidth: 1,
    borderColor: "#FFCCFF"
  },
  texttimelayout: {
    color: "black",
    marginRight: 20,
    fontSize: 25,
  },
});