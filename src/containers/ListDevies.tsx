import database from '@react-native-firebase/database';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { push, replace } from 'src/lib/NavigationService';
import useSelector from 'src/utils/useSelector';
import TopbarBack from '../components/componentBack';
import stylesSheet from './styles';

function ListDevices() {
  const {t} = useTranslation();
  const {user} = useSelector((state: any) => state?.users);
  const [listDevices, setListDevices] = useState([]);
  const array: any = [];
  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/remote/`)
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());
        if (snapshot.val()) Object.entries(snapshot.val()).map((e, index) => (array[index] = e));
        if (array) setListDevices(array);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${user.uid}`).off('value', onValueChange);
  }, [user.uid]);
  //firebase.database().ref("roomUsers").orderByValue().equalsTo(key).once("value").then(snap => {

  // const onOrder = () => {
  //   const ref = database().ref(`/users/${user.uid}/remote/`);
  //   const result = ref
  //     .orderByChild('name')
  //     .equalTo('Quạt')
  //     .once('value')
  //     .then((ss) => {
  //       console.log('chh_log ---> ss', ss.val());
  //     });

  //   console.log('chh_log ---> result ', result);
  // };
  const deleteRemote = (remote: any) => {
    database().ref(`/users/${user.uid}/remote/${remote?.[0]}`).remove();
    Alert.alert('', `Xoá Remote ảo "${remote?.[1]?.name}" thành công`, [
      {text: 'OK', onPress: () => replace('ListDevices')},
    ]);
  };
  const onDeleteDevice = (el: any) => {
    Alert.alert('', `Xác nhận xoá Remote ảo "${el?.[1]?.name}" ?`, [
      {text: 'Cancel', onPress: () => console.log('chh_log ---> cancel delete')},
      {text: 'OK', onPress: () => deleteRemote(el)},
    ]);
  };
  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
          <TopbarBack />
          <View style={stylesSheet.logo}>
            <Image style={stylesSheet.imageLogo} source={require('../../assets/logo.png')} />
          </View>
          <View style={stylesSheet.titleRemote}>
            <Text style={stylesSheet.titleAlign}>{`Danh sách Remote ảo`}</Text>
          </View>
          {listDevices
            ? listDevices.map((el: any) => {
                console.log('chh_log ---> el');
                return (
                  <LinearGradient
                    key={el?.[0]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#ec4427', '#f37e33']}
                    style={stylesSheet.linearGradientBottom}>
                    <TouchableOpacity
                      style={stylesSheet.button}
                      delayLongPress={500}
                      onLongPress={() => onDeleteDevice(el)}
                      onPress={() => push('ListFeatures', {remote: el})}>
                      <Text style={stylesSheet.buttonText}>{el[1]?.name}</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                );
              })
            : null}
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#ec4427', '#f37e33']}
            style={stylesSheet.linearGradientBtnAdd}>
            <TouchableOpacity style={stylesSheet.button} onPress={() => push('InputRemote')}>
              <Text style={stylesSheet.buttonText}>{t('addDevice')}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(ListDevices);
