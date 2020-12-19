import * as React from 'react';
import { StyleSheet, View, Text, Alert, TextInput, Platform, ScrollView } from 'react-native';
import Custombutton from './custombutton';
import {AuthContext} from './GlobalVar';
import firebase from "firebase";
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
//import * as AuthSession from 'expo-auth-session';
//import DeviceInfo from 'react-native-device-info';
import * as Application from 'expo-application';
//import {get_newsParsing} from "./newsParsing";
import '@firebase/firestore';
global.Buffer = global.Buffer || require('buffer').Buffer;
// Imports the Google Cloud client library
//const translate = require('google-translate-api');
//const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
//const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const text = 'The text to translate, e.g. Hello, world!';
// const target = 'The target language, e.g. ru';

// language: en
// question: value

export default function TranslationScreen({ route, navigation }) {
  const [value, onChangeText] = React.useState('');
  const [fullTextAnnotation, setfullTextAnnotation] = React.useState("");
  const [newsparsing, setnewsparsing] = React.useState("");
  const [textparsing, settextparsing] = React.useState("");
  const [language_source, setlanguage_source] = React.useState("한국어");
  const [language_target, setlanguage_target] = React.useState("영어");
  const [language_source_en, setlanguage_source_en] = React.useState("ko");
  const [language_target_en, setlanguage_target_en] = React.useState("en");
  const [errors, setErrors] = React.useState(false);

  const {Textdata} = route.params;

  //const { makeRedirectUri, useAuthRequest, ResponseType, Prompt, useAutoDiscovery } = AuthSession;
  //const useProxy = Platform.select({ web: false, default: true });
  //const discovery = useAutoDiscovery('https://example.com/auth');
  //const [request, response, promptAsync] = useAuthRequest(discovery, {useProxy: useProxy})

  
  //const SaveText = async() => {
  //  const db = firebase.firestore();
  //  var accessToken;
  //  try {
  //    const result = await promptAsync({ useProxy });
  //    if (result.type !== 'success') {
  //      if (Platform.OS === 'web') {
  //        // @ts-ignore
  //        alert('ERROR_UNKNOWN');
  //        return;
  //      }
  //      Alert.alert('ERROR', 'ERROR_UNKNOWN');
  //      return;
  //    }
  //    accessToken = result.params.access_token;
  //    await db.collection("Users").doc(accessToken).collection("Translate_recode").set({data: value, trans: fullTextAnnotation});
  //  }  catch (err) {
  //    if (Platform.OS === 'web') {
  //      // @ts-ignore
  //      alert(`Login Error`, `${err.message}`);
  //      return;
  //    }
  //    Alert.alert(`Login Error`, `${err.message}`);
  //  }
  //};
  
  const SaveText = async() => {
    const db = firebase.firestore();
    //DeviceInfo.getUniqueId().then(async(uniqueId) => {
    //  console.log(uniqueId)
    //  await db.collection("Users").doc(uniqueId).collection("Translate_recode").set({data: value, trans: fullTextAnnotation});
    //});
    await db.collection("Users").doc(Application.androidId).collection("Translate_recode").add({data: value, trans: fullTextAnnotation});
  };
  const axios = require("axios");
  const cheerio = require("cheerio");


  //export var keyword = 'sports'//검색 키워드
  var url = 'https://news.google.com/search?q=';  
  var ulList = [];

  const getHtml = async (keyword) => {
    try {
      return await axios.get(url + keyword);
    } catch (error) {
      console.error(error);
    }
  };

  const get_newsParsing = (keyword) => {
    getHtml(keyword)
      .then(html => {
        const $ = cheerio.load(html.data);
        const $bodyList = $("div.xrnccd").children("article");

        $bodyList.each(function(i, elem) {
          ulList[i] = {
              title: $(this).find('h3 > a').text(),                             //제목
              date: $(this).find('time').attr('datetime'),                      //날짜
              url : 'http://news.google.com'+$(this).find('h3 > a').attr('href')//링크
          };
        });

        const data = ulList.filter(n => n.title);
        //console.log(data);
        
        if (data[0] === undefined) {
          setnewsparsing("뉴스로부터 파싱해올 수 없습니다.");
        }
        else if (data[1] === undefined) {
          setnewsparsing(data[0].title);
        }
        else {
          setnewsparsing(data[0].title + '\n' + data[1].title);
        }
      })//출력
      //.then(res => console.log(res));
  }
  /*async function translateText({ text, target }) {
    // Translates the text into the target language. "text" can be a string for
    // translating a single piece of text, or an array of strings for translating
    // multiple texts.
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:');
    translations.forEach((translation, i) => {
      console.log(`${text[i]} => (${target}) ${translation}`);
    });
  }*/

  const callGoogletranslateApi = async () => {
    let url = `https://translation.googleapis.com/language/translate/v2?key=` + `AIzaSyBfRGMIIf3Ja9QquvEk4EaA0I9g1p_7zoQ`;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        q: value,
        source: language_source_en,
        target: language_target_en,
        format: "text"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error !== undefined) {
          console.log(data);
          console.log(data.error.code + " error : \n" + data.error.errors[0].message);
          setfullTextAnnotation(data.error.code + " error : \n" + data.error.errors[0].message);
          setErrors(true);
          return;
        }
        console.log(data.data.translations[0].translatedText);
        setfullTextAnnotation(data.data.translations[0].translatedText);
        setErrors(false);
      })
      .catch((err) => console.log('error : ', err));
  };

  const onKeyPress = () => {
    if (value !== "") {
      callGoogletranslateApi();
    }
    else {
      setfullTextAnnotation("");
    }
   /* translate('Ik spreek Engels', {to: 'en'}).then(res => {
      console.log(res.text);
      //=> I speak English
      console.log(res.from.language.iso);
      //=> nl
  }).catch(err => {
      console.error(err);
  });*/
    
    //translateText(value, "kr");
  }

  const onsubmitediting = () => {
    if (value !== "") {
      onKeyPress();
      //keyword = value;
      get_newsParsing(value);
      if (errors === false) {
        SaveText();
      }
    }
  }

  const trans_language = () => {
    setlanguage_source(language_source === "한국어" ? "영어" : "한국어");
    setlanguage_target(language_target === "한국어" ? "영어" : "한국어");
    setlanguage_source_en(language_source_en === "ko" ? "en" : "ko");
    setlanguage_target_en(language_target_en === "ko" ? "en" : "ko");
  }

  React.useEffect(() => {
    onKeyPress();
  }, [value, language_source]);
  
  React.useEffect(() => {
    onChangeText(Textdata);
    onsubmitediting();
  }, [Textdata])
  
  return (
    //setfullTextAnnotation(Textdata),
    <View style={styles.maincontainer}>
        <View style={{flexDirection: "row", height: 55}}>
            <Text style={{flex: 5, textAlign: "center", textAlignVertical: "center", backgroundColor: "white", borderBottomWidth: 0.5, borderBottomColor: "#EAEAEA", fontSize: 17}}>
                {language_source}
            </Text>
            <View style={{flex: 2, alignItems: "center", justifyContent: "center", backgroundColor: "white", borderBottomWidth: 0.5, borderBottomColor: "#EAEAEA"}}>
              <IconButton icon="arrow-left-right" color="black" onPress={() => trans_language()} />
            </View>
            <Text style={{flex: 5, textAlign: "center", textAlignVertical: "center", backgroundColor: "white", borderBottomWidth: 0.5, borderBottomColor: "#EAEAEA", fontSize: 17}}>
                {language_target}
            </Text>
        </View>
        <View style={[{ flex: 5, padding: 10, backgroundColor: "white", flexDirection: "row" }, styles.shadow1]}>
          <View style={{flex: 8}}>
            <ScrollView>
            <TextInput 
              style={{flex: 1, justifyContent: 'center', fontSize: 25 }}
              onChangeText={text => onChangeText(text)}
              value={value}
              multiline={true}
              autoFocus={true}
              editable={true}
              placeholder={"번역할 내용을 입력하세요."}
              blurOnSubmit={true}
              onSubmitEditing={onsubmitediting}
            />
            </ScrollView>
          </View>
          {value !== '' ? (<View style={{flex: 1}}>
            <IconButton icon="close" color="black" onPress={() => onChangeText('')}/>
          </View>) : null}
        </View>
        <View style={{ flex: 16, padding: 10 }}>
          <ScrollView>
            <Text
              style={{ flex: 1, justifyContent: 'center', fontSize: 25 }}
            >
              {fullTextAnnotation}
            </Text>
            {
              value !== "" ? (
              <>
                <Text
                  style={{ flex: 1, justifyContent: 'center', fontSize: 25 }}
                >
                  {"\n----------------------------\n"}
                </Text>
                <Text
                  style={{ flex: 1, justifyContent: 'center', fontSize: 25 }}
                >
                  {`예문 파싱: \n${textparsing}`}
                </Text>
                <Text
                  style={{ flex: 1, justifyContent: 'center', fontSize: 25 }}
                >
                  {"\n"}
                </Text>
                <Text
                  style={{ flex: 1, justifyContent: 'center', fontSize: 25 }}
                >
                  {`기사 파싱: \n${newsparsing}`}
                </Text>
              </>
              ) : null
            }
          </ScrollView>
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