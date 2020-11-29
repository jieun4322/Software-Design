import * as React from 'react';
import { StyleSheet, View, Text, Alert, TextInput } from 'react-native';
import Custombutton from './custombutton';
import {AuthContext} from './GlobalVar';
import firebase from "firebase";
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
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

export default function TranslationScreen({ navigation }) {
  const [value, onChangeText] = React.useState('');
  const [fullTextAnnotation, setfullTextAnnotation] = React.useState('');
  const [language_source, setlanguage_source] = React.useState("한국어");
  const [language_target, setlanguage_target] = React.useState("영어");
  const [language_source_en, setlanguage_source_en] = React.useState("ko");
  const [language_target_en, setlanguage_target_en] = React.useState("en");
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
        console.log(data.data.translations[0].translatedText);
        setfullTextAnnotation(data.data.translations[0].translatedText);
      })
      .catch((err) => console.log('error : ', err));
  };

  const onKeyPress = async() => {
    callGoogletranslateApi();
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

  const trans_language = () => {
    setlanguage_source(language_source === "한국어" ? "영어" : "한국어");
    setlanguage_target(language_target === "한국어" ? "영어" : "한국어");
    setlanguage_source_en(language_source_en === "ko" ? "en" : "ko");
    setlanguage_target_en(language_target_en === "ko" ? "en" : "ko");
    let temp = value;
    onChangeText(fullTextAnnotation);
    setfullTextAnnotation(temp);
  }

  React.useEffect(() => {
    onKeyPress()
  }, [value, language_source]);
  
  return (
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
        <View style={[{padding: 10, flex: 5, backgroundColor: "white", flexDirection: "row" }, styles.shadow1]}>
          <View style={{flex: 8}}>
            <TextInput 
              style={{flex: 1, justifyContent: 'center', fontSize: 25 }}
              onChangeText={text => onChangeText(text)}
              value={value}
              multiline={true}
              autoFocus={true}
              editable={true}
              placeholder={"번역할 내용을 입력하세요."}
              blurOnSubmit={true}
              onSubmitEditing={onKeyPress}
            />
          </View>
          {value !== '' ? (<View style={{flex: 1}}>
            <IconButton icon="close" color="black" onPress={() => onChangeText('')}/>
          </View>) : null}
        </View>
        <View style={{ flex: 16, padding: 10 }}>
            <Text
              style={{ flex: 1, justifyContent: 'center', fontSize: 25 }}
            >
              {fullTextAnnotation}
            </Text>
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