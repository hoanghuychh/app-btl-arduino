import database from '@react-native-firebase/database';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { push } from 'src/lib/NavigationService';
import useSelector from 'src/utils/useSelector';
import stylesSheet from './styles';

function InputFeature(props) {
  console.log('chh_logInputFeature ---> props', props);
  const remote = props?.route?.params?.remote;
  console.log('chh_logInputFeature ---> remote', remote);
  const {t} = useTranslation();
  const {user} = useSelector((state: any) => state?.users);
  const [nameFeature, setNameFeature] = useState('');
  const [describe, setDescribe] = useState('');
  const onAddFeature = () => {
    if (nameFeature) {
      database().ref(`/users/${user.uid}/remote/${remote?.[0]}/feature/`).push({
        name: nameFeature,
        describe: describe,
      });
      Alert.alert(
        '',
        `Thêm tính năng ${nameFeature} thành công cho thiết bị ${remote?.[1]?.name}`,
        [{text: 'OK', onPress: () => push('ListDevices')}],
      );
    } else {
      Alert.alert('Thêm thiết bị thất bại', 'Vui lòng điền tên tính năng', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };
  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
          <View style={stylesSheet.logo}>
            <Image style={stylesSheet.imageLogo} source={require('../../../assets/logo.png')} />
          </View>
          <>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ec4427', '#f37e33']}
              style={stylesSheet.linearGradient}>
              <TextInput
                style={stylesSheet.input}
                onChangeText={setNameFeature}
                value={nameFeature}
                placeholder="Tên tính năng"
                placeholderTextColor="#bdc3c7"
              />
            </LinearGradient>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ec4427', '#f37e33']}
              style={stylesSheet.linearGradientDescribe}>
              <TextInput
                style={stylesSheet.input}
                onChangeText={setDescribe}
                value={describe}
                placeholder="Mô tả"
                placeholderTextColor="#bdc3c7"
              />
            </LinearGradient>
          </>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#ec4427', '#f37e33']}
            style={stylesSheet.linearGradientBtnAdd}>
            <TouchableOpacity style={stylesSheet.button} onPress={onAddFeature}>
              <Text style={stylesSheet.buttonText}>{t('continue')}</Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={stylesSheet.wrapKmakey}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={require('../../../assets/kmakey.png')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(InputFeature);
