import * as React from 'react';
import { StyleSheet, View, Text, StatusBar, TextInput, Alert, AsyncStorage } from 'react-native';
import CustomButton from './custombutton';
import {AuthContext} from './GlobalVar';

export default function Login({ navigation }) {
    const [value1, onChangeText1] = React.useState('');
    const [value2, onChangeText2] = React.useState('');
    const { signIn } = React.useContext(AuthContext);
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
                    아이디
                  </Text>
                  <TextInput
                    style={{flex: 2, height: 30, borderWidth: 1, borderRadius: 5}}
                    placeholder="ID"
                    editable
                    maxLength={20}
                    onChangeText={text => onChangeText1(text)}
                    value={value1}
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
                    title={"로그인"} 
                    onPress={ async() => {
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
                    }} 
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