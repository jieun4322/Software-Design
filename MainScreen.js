import * as React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Custombutton from './custombutton';
import {AuthContext} from './GlobalVar';
import firebase from "firebase";
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as Permissions from 'expo-permissions';

export default function MainScreen({ navigation }) {
  // const [permission_camera, askPermission_camera, getPermission_camera] = usePermissions(Permissions.CAMERA, { ask: true });
  // const [permission_file, askPermission_file, getPermission_file] = usePermissions(Permissions.CAMERA_ROLL, { ask: true });
  
  // const requestPermission = async({Permission}) => {
  //   const {status} = await Permissions.askAsync(Permission);
  //   if (status !== 'granted') {
  //     alert("No Permission of Camera");
  //   }
  // }

  return (
    <View style={styles.maincontainer}>
        <View style={{flexDirection: "row", height: 55}}>
            <Text style={{flex: 5, textAlign: "center", textAlignVertical: "center", backgroundColor: "white", borderBottomWidth: 0.5, borderBottomColor: "#EAEAEA", fontSize: 17}}>
                한국어
            </Text>
            <View style={{flex: 2, alignItems: "center", justifyContent: "center", backgroundColor: "white", borderBottomWidth: 0.5, borderBottomColor: "#EAEAEA"}}>
                <IconButton icon="arrow-left-right" color="black" onPress={() => null} />
            </View>
            <Text style={{flex: 5, textAlign: "center", textAlignVertical: "center", backgroundColor: "white", borderBottomWidth: 0.5, borderBottomColor: "#EAEAEA", fontSize: 17}}>
                영어
            </Text>
        </View>
        <View style={{flex: 16 }}>
            <TouchableOpacity style={[{flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "white" }, styles.shadow1]} onPress={()=>{navigation.navigate("TranslationScreen")}}>
                <Text style={{color: "#D5D5D5"}}>Text를 입력하려면 탭하세요</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex: 8}}>
            <TouchableOpacity style={{flex: 4, borderRadius: 40, marginHorizontal: 40, marginTop: 20, marginBottom: 8, justifyContent: 'center', alignItems: "center", backgroundColor: "#E4EDFF" }} onPress={()=>{navigation.navigate("PhotofileScreen")}}>
                <Text>Photofile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 4, borderRadius: 40, marginHorizontal: 40, marginBottom: 20, marginTop: 8, justifyContent: 'center', alignItems: "center", backgroundColor: "#D8FFE5" }} onPress={()=>{navigation.navigate("CameraScreen")}}>
                <Text>Camera</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

function elevationShadowStyle(elevation) {
    return {
      elevation,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.3,
      shadowRadius: 0.8 * elevation
    };
}
  
const styles = StyleSheet.create({
  shadow1: elevationShadowStyle(2),
  maincontainer: {
    flex: 1,
    backgroundColor: "white"
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