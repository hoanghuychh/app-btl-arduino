import database from '@react-native-firebase/database';
import React, { memo, useEffect, useState } from 'react';
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
import TopbarBack from '../componentBack';
import Loading from '../componentLoading';
import stylesSheet from './styles';
function InputFeature(props) {
  const remote = props?.route?.params?.remote;
  const {t} = useTranslation();
  const {user} = useSelector((state: any) => state?.users);
  const [nameFeature, setNameFeature] = useState('');
  const [describe, setDescribe] = useState('');
  const [listNotification, setListNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const array: any = [];
  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/notifications/`)
      .on('value', (snapshot) => {
        console.log('onValueChange: ', snapshot.val());
        if (snapshot.val() === null) {
          setListNotification([]);
        }
        if (snapshot.val()) Object.entries(snapshot.val()).map((e, index) => (array[index] = e));
        if (array?.length > 0) {
          setListNotification(array);
        }
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${user.uid}`).off('value', onValueChange);
  }, [user.uid]);
  useEffect(() => {
    if (listNotification?.length > 0) {
      setIsLoading(true);
    }
    if (listNotification?.length <= 0 && isLoading) {
      setIsLoading(false);
      Alert.alert(
        '',
        `Thêm tính năng "${nameFeature}" thành công cho thiết bị "${remote?.[1]?.name}"`,
        [{text: 'OK', onPress: () => push('ListDevices')}],
      );
    }
  }, [listNotification]);
  const onAddFeature = () => {
    if (nameFeature) {
      const featureKey = database().ref(`/users/${user.uid}/remote/${remote?.[0]}/feature/`).push({
        name: nameFeature,
        describe: describe,
      });
      database()
        .ref(`/users/${user.uid}/notifications`)
        .push({
          type: 'receive',
          url: `users/${user.uid}/remote/${remote?.[0]}/feature/${featureKey?.key}/value`,
        });
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
          <TopbarBack />
          <View style={stylesSheet.logo}>
            <Image style={stylesSheet.imageLogo} source={require('../../../assets/logo.png')} />
          </View>
          <Loading isLoading={isLoading} />
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
            <TouchableOpacity
              style={stylesSheet.button}
              disabled={isLoading}
              onPress={onAddFeature}>
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
