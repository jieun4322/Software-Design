import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, AsyncStorage, YellowBox } from 'react-native';
import CustomButton from './custombutton';
import firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";
// Initialize Firebase

YellowBox.ignoreWarnings(['Setting a timer']);
export default function SignUp({ navigation }) {
  const [value1, onChangeText1] = useState('');
  const [value2, onChangeText2] = useState('');
  const [value3, onChangeText3] = useState('');

  const ref_input2 = useRef();
  const ref_input3 = useRef();

  const onClick = () => { 
    /*
    value2 == value3
      ? (
        value1 != '' && value2 != ''
          ? ( 
            Alert.alert("Alert","회원가입이 완료되었습니다."),
            navigation.popToTop(),
            AsyncStorage.setItem(value1, value2)
          ) : (
            Alert.alert("Alert", "아이디 또는 비밀번호가 비어 있습니다.")
          )
      ) : (
        Alert.alert("Alert","비밀번호와 확인이 동일하지 않습니다.")
      )
    */
    
    //  email, password = value1, value2
    

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
        <View style={{flex: 2, alignItems: "center"}}>
          <View style={styles.footer}>
            <View style={{
              width: "100%",
              height: "20%",
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
              height: "20%",
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