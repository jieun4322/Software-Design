import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, AsyncStorage, YellowBox } from 'react-native';
import CustomButton from './custombutton';
import firebase from "firebase";
import * as Google from 'expo-google-app-auth';
import * as AuthSession from 'expo-auth-session';
import * as GoogleSignIn from 'expo-google-sign-in';
import SocialSignInButton from './SocialSigninButton';
import SvgGoogle from './assets/svgs/google.svg';
import {AuthContext} from "./GlobalVar";

YellowBox.ignoreWarnings(['Setting a timer']);
export default function SignUp({ navigation }) {
  const [value1, onChangeText1] = useState('');
  const [value2, onChangeText2] = useState('');
  const [value3, onChangeText3] = useState('');
  const [user, onChangeUser] = useState(null);
  const { signIn } = React.useContext(AuthContext);
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  var provider = new firebase.auth.GoogleAuthProvider;
  const onClick = () => { 
    value2 == value3 
      ? (
        firebase.auth()
          .createUserWithEmailAndPassword(value1, value2)
            .then((authUser) => {
              navigation.popToTop(),
              Alert.alert("회원가입이 완료되었습니다."),
              firebase.database().ref("/users/")
                .child(authUser.user.uid)
                .set({
                  value1,
                  value2
                })
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
            })
      ) : (
        Alert.alert("비밀번호와 확인이 일치하지 않습니다.")
      )
  }

  const onKeyPress = () => {
    onClick();
  }

  const onClick_Google = async() => {
    /*
    provider.addScope('profile');
    provider.addScope('https://www.googleapis.com/auth/drive');
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log("성공");
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage);
        Alert.alert(errorMessage);
      })
    
    firebase.auth().getRedirectResult()
      .then((authData) => {
        console.log(authData);
      }).catch((error) => {
        console.log(error);
      });
      */
     /*
    if (user) {
      signOutAsync();
    } else {
      signInAsync();
    }*/
    /*
    try {
      const result = await Google.logInAsync({
        expoClientId: `324925880954-njsega7jfjjf0rutj9ivig7cp84flc16.apps.googleusercontent.com`,
        androidClientId: "324925880954-b3fq03knudvcckep09eq646ssiekf324.apps.googleusercontent.com",
        iosClientId: "324925880954-ha8d589qhdamvh3p3oodu65n4ldeebgk.apps.googleusercontent.com",
        androidStandaloneAppClientId: `324925880954-b3fq03knudvcckep09eq646ssiekf324.apps.googleusercontent.com`,
        iosStandaloneAppClientId: `324925880954-ha8d589qhdamvh3p3oodu65n4ldeebgk.apps.googleusercontent.com`,
        redirectUrl: "http://localhost:19001/node_modules%5Cexpo%5CAppEntry.bundle"
      });
  
      if (result.type === 'success') {
        console.log(result.user, result.accessToken);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
      Alert.alert(e);
      return { error: true };
    }
*/
    
  }
  /*
  useEffect(() => {
    initAsync();
  },[])

  initAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: '324925880954-ha8d589qhdamvh3p3oodu65n4ldeebgk.apps.googleusercontent.com',
    });
    _syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    if (user != null) {
      navigation.popToTop(),
      Alert.alert("회원가입이 완료되었습니다."),
      firebase.database().ref("/users/")
        .child(user.uid)
        .set({
          value1,
          value2
        })
    }
    onChangeUser(user);
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    Alert.alert("로그아웃 하였습니다.");
    onChangeUser(null);
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        _syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };
*/
  return (
    <View style={{
      flex: 1,
      padding: 10,
      backgroundColor: "white"
    }}>
        <View style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 10
        }}>
          <Text style={{fontSize: 50, }}>
              회원가입
          </Text>
        </View>
        <View style={{
          flex: 2,
        }}>
          <View style={{
            flex: 2,
            borderTopWidth: 2,
          }}>
            <View style={{
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "flex-end",
            }}>
              <Text style={{
                flex: 1,
                height: 30,
                fontSize: 20,
              }}>
                이메일
              </Text>
              <TextInput
                onSubmitEditing={() => ref_input2.current.focus()}
                style={{flex: 2, height: 30, borderWidth: 1, borderRadius: 5}}
                placeholder="ID"
                editable
                maxLength={20}
                onChangeText={text => onChangeText1(text)}
                value={value1}
                autoFocus={true}
                blurOnSubmit={false}
                returnKeyType = {"next"}
              />
            </View>
            <View style={{
              marginTop: 10,
              alignItems: "center", 
              flexDirection: "row",
              justifyContent: "center",
            }}>
              <Text style={{
                flex: 1,
                height: 30,
                fontSize: 20,
                justifyContent: "center",
              }}>
                비밀번호
              </Text>
              <TextInput 
                style={{flex: 2, height: 30, borderWidth: 1, borderRadius: 5}}
                placeholder="password"
                editable
                maxLength={20}
                onChangeText={text => onChangeText2(text)}
                value={value2}
                blurOnSubmit={false}
                secureTextEntry
                returnKeyType = {"next"}
                onSubmitEditing={() => ref_input3.current.focus()}
                ref={ref_input2}
              />
            </View>
            <View style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}>
              <Text style={{
                flex: 1,
                height: 30,
                fontSize: 20
              }}>
                비밀번호 확인
              </Text>
              <TextInput 
                style={{flex: 2, height: 30, borderWidth: 1, borderRadius: 5}}
                placeholder="repeat password"
                editable
                maxLength={20}
                onChangeText={text => onChangeText3(text)}
                value={value3}
                onSubmitEditing={onKeyPress}
                blurOnSubmit={true}
                secureTextEntry
                ref={ref_input3}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={{padding: 5, marginBottom: 10, borderRadius: 20}}>
             <SocialSignInButton
                clientId={`302091027714945`}
                clientSecret={`272f68e4f928ba0d56237660ee8d12c9`}
                onUserCreated={(user) => {
                  signIn(user);
                }}
                socialProvider={"facebook"}
              />
            </View>
            <View style={{padding: 5, marginBottom: 10, borderRadius: 20}}>
              <SocialSignInButton
                clientId={`324925880954-njsega7jfjjf0rutj9ivig7cp84flc16.apps.googleusercontent.com`}
                clientSecret={`uYLuA42qTrwFL47VcXcwrtJC`}
                onUserCreated={(user) => {
                  signIn(user);
                }}
                socialProvider={"google"}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 1, alignItems: "center"}}>
          <View style={styles.footer}>
            <View style={{
              width: "100%",
              height: "40%",
              borderWidth: 1,
              marginBottom: 10
            }}>
              <CustomButton 
                titleColor={"white"}
                buttonColor={'#444'}
                title={"취소"} 
                onPress={() => navigation.popToTop()} 
              />
            </View>
            <View style={{
              width: "100%",
              height: "40%",
              borderWidth: 1,
            }}>
              <CustomButton 
                titleColor={"white"}
                buttonColor={'#023e73'}
                title={"회원가입"} 
                onPress={onClick}
              />
            </View>
          </View>
        </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'skyblue',
  },
  header: {
    width:'100%',
    height:'5%',
    //backgroundColor: '#ff9a9a',
  },
  title: {
    width:'100%',
    height:'18%',
    justifyContent: 'center',
    //backgroundColor: '#9aa9ff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:30,
    //backgroundColor: '#d6ca1a',
  },
  footer: {
    flex: 1,
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "flex-end",
    //backgroundColor: '#1ad657',
  },
});