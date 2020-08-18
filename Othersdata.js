import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';

export default class Othersdata extends Component {
  state = {
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
          handler={(selection, row) => this.setState( (nowstate) => ({
            region: nowstate.region,
            markers: nowstate.markers,
            text: data[selection][row], 
            temp: false 
          }))}
          data={data}
        >
            <View style={styles.container}>
              <View style={styles.loadingcontainer}>
                <Text style={{fontSize: 50}}>Hello!</Text>
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
    height: 64,
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
    flex: 1,
    width: '60%',
    color: "#2c2c2c",
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: "300",
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5
  },
  loadingcontainer: {
      flex: 1,
      justifyContent: 'center'
  }
});