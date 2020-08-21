import * as React from 'react';
import { StyleSheet, View, Text, TextInput, Alert, AsyncStorage } from 'react-native';
import CustomButton from './custombutton';
import {AuthContext} from './GlobalVar';
import firebase from "firebase";
import SocialSignInButton from './SocialSigninButton';

export default function Login({ navigation }) {
    const [value1, onChangeText1] = React.useState('');
    const [value2, onChangeText2] = React.useState('');
    const { signIn } = React.useContext(AuthContext);
    const ref_input2 = React.useRef();
    
    const onClick = async() => {
      /*
      let data;
      try {
        data = await AsyncStorage.getItem(value1);
        data == value2
          ? (
            Alert.alert("로그인이 완료되었습니다."),
            signIn({ value1, value2 })
          ) : data == null ? (
            Alert.alert("아이디를 잘못 입력하였습니다.")
          ) : (
            Alert.alert("비밀번호를 잘못 입력하였습니다.")
          )
      } catch(error) {
        Alert.alert("Alert","아이디를 잘못 입력하였습니다.");
      }
      */
     firebase.auth()
        .signInWithEmailAndPassword(value1, value2)
        .then(() => { signIn({ value1 }), Alert.alert("로그인이 완료되었습니다.") })
        .catch(function(error) {
          var errorMessage = error.message;
          alert(errorMessage);
          
          console.log(error);
        });
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
                  로그인
              </Text>
            </View>
            <View style={{
              flex: 2,
            }}>
              <View style={{
                flex: 2,
                borderTopWidth: 2,
                justifyContent: "flex-start"
              }}>
                <View style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 20
                }}>
                  <Text style={{
                    flex: 1,
                    height: 30,
                    fontSize: 20
                  }}>
                    이메일
                  </Text>
                  <TextInput
                    style={{flex: 2, height: 30, borderWidth: 1, borderRadius: 5}}
                    placeholder="ID"
                    editable
                    maxLength={20}
                    onChangeText={text => onChangeText1(text)}
                    value={value1}
                    blurOnSubmit={false}
                    returnKeyType = {"next"}
                    autoFocus={true}
                    onSubmitEditing={() => ref_input2.current.focus()}
                  />
                </View>
                <View style={{
                  marginTop: 10,
                  alignItems: "center", 
                  flexDirection: "row"
                }}>
                  <Text style={{
                    flex: 1,
                    height: 30,
                    fontSize: 20
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
                    secureTextEntry
                    ref={ref_input2}
                    blurOnSubmit={true}
                    onSubmitEditing={onKeyPress}
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
                    title={"로그인"} 
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