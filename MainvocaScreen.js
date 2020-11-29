import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, ScrollView, StatusBar, Alert, Animated as RNAnimated, Easing as RNAnimatedEasing, Keyboard } from 'react-native';
import ReAnimated, { Easing as ReAnimatedEasing } from 'react-native-reanimated';
//import Constants from 'expo-constants';
import { SimpleLineIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");

const searchBarHeight = 50;
const topPosition = 0; // Constants.statusBarHeight
const centerPosition = (height - searchBarHeight) / 2;

const useReanmiated = true;
const Animated = useReanmiated ? ReAnimated : RNAnimated;
const Easing = useReanmiated ? ReAnimatedEasing : RNAnimatedEasing;

export default function MainvocaScreen({ navigation }) {
  const [isOpened, setIsOpened] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [edittext, setedittext] = React.useState(true);
  const animPosition = React.useRef(new Animated.Value(0)); //centerPosition
  const animWidth = React.useRef();
  const animOpacity = React.useRef();
  const textRef = React.useRef();
  
  const onFocus = () => {
    setIsOpened(true);
    Animated.timing(animPosition.current, {
      toValue: topPosition,
      duration: 300,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const onBlur = () => {
    Animated.timing(animPosition.current, {
      toValue: 0, //centerPosition
      duration: 300,
      easing: Easing.in(Easing.ease),
    }).start(() => setIsOpened(false));
  };

  React.useEffect(()=>{
    Keyboard.addListener('keyboardDidShow', onFocus);
    Keyboard.addListener('keyboardDidHide', onBlur);
  }, []);

  animWidth.current = animPosition.current.interpolate({
    inputRange: [topPosition, centerPosition],
    outputRange: [width, width * 0.8],
  });

  animOpacity.current = animPosition.current.interpolate({
    inputRange: [0, centerPosition],
    outputRange: [1, 0],
  });

  const data = [["I", "나"], ["do", "하다"] , ["not", "아니"], ["wanna", "원하다"], ["make", "만들다"], ["it", "그것"], ["alone", "혼자"], [".", "."], ["So", "정말로"], ["sad", "슬픈"], ["...", "..."]];
  const searchdata = ["jja", "jeung", "nan", "da", "geu", "man", "ha", "go", "sip", "da", "him", "deul", "da"]

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: animOpacity.current,
          paddingTop: searchBarHeight,
          width: animWidth.current, // '100%',
          height: '100%',
        }}>
        {isOpened && (
          <ScrollView keyboardShouldPersistTaps={'always'}>
            <Text style={{
                    padding: 10,
                    backgroundColor: 'white',
                    marginBottom: 2,
                    borderBottomWidth: 1,
                    textAlign: 'center',
                }}
                key={-20}
            >
              최근 검색 내역
            </Text>
            {searchdata.map((val, index) => {
              return (
                <Text
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    marginBottom: 2,
                    borderBottomWidth: 1
                  }}
                  key={index}
                  onPress={() => {setValue(val), onBlur()}}
                >
                  검색내역 {index + 1}: {val}
                </Text>
              );
            })}
          </ScrollView>
        )}
        {!isOpened && (
          <ScrollView>
            {value !== '' && (
              <Text
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  fontSize: 20,
                  textAlign: 'center',
                  borderBottomWidth: 2
                }}
                key={-10}
              >
                {value}에 대한 검색 결과
              </Text>
            )}
            {data.map((val, index) => {
              return (
                <>
                  <Text
                    style={{
                      padding: 10,
                      backgroundColor: 'white',
                      fontSize: 24,
                      textAlign: 'center'
                    }}
                    key={index + 20}
                    onPress={() => Alert.alert('press!', val[0] + ' : ' + val[1])}>
                    {val[0]}
                  </Text>
                  <Text
                    style={{
                      padding: 10,
                      backgroundColor: 'white',
                      borderBottomWidth: 1,
                      fontSize: 20,
                      textAlign: 'center'
                    }}
                    key={index + 40}
                    onPress={() => Alert.alert('press!', val[0] + ' : ' + val[1])}>
                    {val[1]}
                  </Text>
                </>
              );
            })}
          </ScrollView>
        )}
      </Animated.View>

      <Animated.View
        style={{
          borderBottomWidth: 1,
          position: 'absolute',
          alignSelf: 'center',
          justifyContent: 'center',
          height: searchBarHeight,
          width: animWidth.current,
          top: animPosition.current,
          padding: 10
        }}
      >
        <Animated.View style={{
            borderRadius: 10,
            borderWidth: 1,
            backgroundColor: '#c8c8c8',
            flexDirection: 'row',
          }}
        >
          <Animated.View style={{padding: 5}}>
            <SimpleLineIcons size={20} color="black" name='magnifier' />
          </Animated.View>
          <TextInput
            ref={textRef}
            onSubmitEditing={Keyboard.dismiss}
            style={{
              width: '100%',
              height: '100%',
              paddingHorizontal: 5,
              fontSize: 14,
            }}
            editable={edittext}
            onChangeText={text => setValue(text)}
            value={value}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0, //Constants.statusBarHeight
    backgroundColor: '#ffffff',
  },
});