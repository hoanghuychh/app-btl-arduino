import database from '@react-native-firebase/database';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { push } from 'src/lib/NavigationService';
import useSelector from 'src/utils/useSelector';
import TopbarBack from '../components/componentBack';
import stylesSheet from './styles';

function ListSmartRemote() {
  const {t} = useTranslation();
  const {user} = useSelector((state: any) => state?.users);
  console.log('chh_log ---> user', user);
  const [ListSmartRemote, setListSmartRemote] = useState([]);
  console.log('chh_log ---> ListSmartRemote', ListSmartRemote);
  const array: any = [];
  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/smart_remotes/`)
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());
        if (snapshot.val()) Object.entries(snapshot.val()).map((e, index) => (array[index] = e));
        if (array) setListSmartRemote(array);
      });
    return () => database().ref(`/users/${user.uid}`).off('value', onValueChange);
  }, [user.uid]);
  const deleteSmartRemote = (smart_remotes: any) => {
    console.log(
      'chh_log xoa ---> smartRemote',
      `/users/${user.uid}/smart_remotes/${smart_remotes?.[0]}`,
    );
    database().ref(`/users/${user.uid}/remote/${smart_remotes?.[0]}`).remove();
    Alert.alert('', `Xoá thiết bị "${smart_remotes?.[1]?.name}" thành công`, [
      {text: 'OK', onPress: () => push('Home')},
    ]);
  };
  const onDeleteDevice = (el: any) => {
    Alert.alert('', `Xác nhận xoá Smart Remote "${el?.[1]?.name}" ?`, [
      {text: 'Cancel', onPress: () => console.log('chh_log ---> cancel delete')},
      {text: 'OK', onPress: () => deleteSmartRemote(el)},
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
          {ListSmartRemote
            ? ListSmartRemote.map((el: any) => {
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
                      onPress={() => push('InputSmartRemote', {smart_remotes: el})}>
                      <Text style={stylesSheet.buttonText}>{el[1]?.name}</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                );
              })
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(ListSmartRemote);
