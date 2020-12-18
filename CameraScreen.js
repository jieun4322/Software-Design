import * as React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import Custombutton from './custombutton';
import {AuthContext} from './GlobalVar';
import firebase from "firebase";
import * as Permissions from "expo-permissions";
import {Camera} from "expo-camera";
import { ActivityIndicator, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
const { width, height } = Dimensions.get("window");
const ALBUM_NAME = "Word Cam";

export default function CameraScreen({ navigation }) {
  const [selected, setSelected] = React.useState('');
  //접근 권한 허용했는지 
  const [hasAllow , setHasAllow] = React.useState(false);
  const [hasAllow_file , setHasAllow_file] = React.useState(false);
  const [cameraType, setcameraType] = React.useState(Camera.Constants.Type.back);
  const [fullTextAnnotation, setfullTextAnnotation] = React.useState('');
  const cameraRef = React.useRef();
  const requestPermission = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    setHasAllow(status === "granted");
  };

  const switchCameraType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setcameraType(Camera.Constants.Type.back)
    } else {
      setcameraType(Camera.Constants.Type.front)
    }
  }

  const savePhoto = async (uri) => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  
      if (status === 'granted') {
        setHasAllow_file(true);
        const asset = await MediaLibrary.createAssetAsync(uri)
        let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME)
  
        if (album === null) {
          album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset)
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id)
        }
        setTimeout(
          () =>
          2000
        )
      } else {
        setHasAllow_file(false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const exitPhoto = () => {
    setSelected('');
  }

  const takePhoto = async () => {
    try {
      if (cameraRef.current) {
        let photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true
        })
        console.log("uri: ", photo.uri);
  
        if (photo.uri) {
          setSelected(photo.uri);
          callGoogleVIsionApi(photo.base64);
          savePhoto(photo.uri);
        }
      }
    } catch (error) {
      alert(error)
    }
  }

  const callGoogleVIsionApi = async (base64) => {
    let url = `https://vision.googleapis.com/v1/images:annotate?key=` + `AIzaSyBfRGMIIf3Ja9QquvEk4EaA0I9g1p_7zoQ`;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'TEXT_DETECTION', maxResults: 5 },
              { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
              { type: 'WEB_DETECTION', maxResults: 5 },
            ],
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error != null) {
          console.log(data.error.code + " error : \n" + data.error.errors[0].message);
          setfullTextAnnotation(data.error.code + " error : \n" + data.error.errors[0].message);
          return;
        }
        console.log(data.responses[0].fullTextAnnotation.text);
        setfullTextAnnotation(data.responses[0].fullTextAnnotation.text);
        navigation.navigate("TranslationScreen", {Textdata: data.responses[0].fullTextAnnotation.text});
      })
      .catch((err) => console.log('error : ', err));
  };

  // async function quickstart({uri}) {
  //   // Imports the Google Cloud client library
  //   const vision = require('@google-cloud/vision');
  
  //   // Creates a client
  //   const client = new vision.ImageAnnotatorClient();
  
  //   // Performs label detection on the image file
  //   const [result] = await client.labelDetection(uri);
  //   const labels = result.labelAnnotations;
  //   console.log('Labels:');
  //   labels.forEach(label => console.log(label.description));
  // }

  React.useEffect(() => {
    requestPermission();
  }, []);

  return (
      <View style={styles.maincontainer}>
          {/* <Text>
            CameraScreen
          </Text> */}
          {selected === '' ? (
            <View>
              <Camera 
                ref = {cameraRef}
                style={{
                  width: width - 40,
                  height: height / 1.5,
                  overflow: 'hidden',
                }}
                type={cameraType}
              />
              <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity onPress={null} style={{marginHorizontal: 20, marginVertical: 10}}>
                  <MaterialIcons
                    name={"photo"}
                    size={44}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={takePhoto} style={{marginHorizontal: 20, marginVertical: 10}}>
                  <MaterialIcons
                    name={"radio-button-unchecked"}
                    size={44}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={switchCameraType} style={{marginHorizontal: 20, marginVertical: 10}}>
                  <MaterialIcons
                    name={
                      cameraType === Camera.Constants.Type.front ? 'camera-rear' : 'camera-front'
                    }
                    size={44}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Image
                style={{
                width: width - 40,
                height: height / 1.5,
                resizeMode: 'contain',
                }}
                source={{ uri: selected }}
              />
              <TouchableOpacity onPress={exitPhoto} style={{justifyContent: "center", alignSelf: "flex-end"}}>
                <MaterialIcons
                  name={"arrow-back"}
                  size={44}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          )}
      </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
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