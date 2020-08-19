import * as React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Custombutton from './custombutton';
import {AuthContext} from './GlobalVar';
import firebase from "firebase";

export default function Settingdata({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const onPress = async() => {
    firebase.auth().signOut().then(()=>{
      signOut(null), 
      Alert.alert("로그아웃되었습니다.")
    })
  }
  const data = [["Date 1","Date 2","Date 3","Date 4","Date 5","Date 6","Date 7","Date 8","Date 9","Date 10"]];
  return (
      <View style={styles.maincontainer}>
        <View style={styles.Topbar}>
          <Text style={{fontSize: 25}}>Setting</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.Settingbutton}>
            <Custombutton title={"개인정보 수집 동의"} onPress={() => Alert.alert("Alert","개인정보 수집 동의")}/>
          </View>
          <View style={styles.Settingbutton}>
            <Custombutton title={"알림 설정"} onPress={() => Alert.alert("Alert","알림 설정")}/>
          </View>
          <View style={styles.Settingbutton}>
            <Custombutton title={"버전 정보"} onPress={() => Alert.alert("Alert","버전 정보")}/>
          </View>
          <View style={styles.Settingbutton}>
            <Custombutton title={"고객센터/도움말"} onPress={() => Alert.alert("Alert","고객센터/도움말")}/>
          </View>
          <View style={styles.Settingbutton}>
            <Custombutton title={"Lisence"} onPress={() => Alert.alert("Alert","Lisence")}/>
          </View>
          <View style={styles.Settingbutton}>
            <Custombutton title={"Sign Out"} onPress={() => Alert.alert("Alert","로그아웃 하시겠습니까?", [{text: "No", onPress: () => null},{text: "Yes", onPress: onPress}])} />
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 10
  },
  Topbar: {
    flex: 1,
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
    backgroundColor: "#48FFFF",
    borderTopWidth: 2,
    borderColor: "#FFCCFF",
    padding: 15
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
  Settingbutton: {
    height: "10%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FFCCFF",
    fontSize: 25,
  },
});