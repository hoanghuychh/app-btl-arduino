import database from '@react-native-firebase/database';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { push, replace } from 'src/lib/NavigationService';
import TopbarBack from '../components/componentBack';
import Loading from '../components/componentLoading';
import stylesSheet from './styles';

function ListFeatures(props: any) {
  const remoteId = props?.route?.params?.remote?.[0];
  const remoteName = props?.route?.params?.remote?.[1]?.name;
  const {t} = useTranslation();
  const {user} = useSelector((state: any) => state?.users);
  const [listFeatures, setListFeatures] = useState([]);
  const [listNotificationFeature, setListNotificationFeature] = useState([]);
  const [isLoadingFeature, setIsLoadingFeature] = useState(false);
  const [update, setUpdate] = useState(false);
  const arrayNotification: any = [];
  const arrayFeatures: any = [];
  useEffect(() => {
    console.log('====================================');
    console.log('effect update feature', listFeatures);
    console.log('====================================');
    const onValueChange = database()
      .ref(`/users/${user.uid}/remote/${remoteId}/feature`)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          Object.entries(snapshot.val()).map((e, index) => (arrayFeatures[index] = e));
          console.log('====================================');
          console.log('effect update feature indei', snapshot.val());
          console.log('====================================');
        }
        if (arrayFeatures?.length > 0) setListFeatures(arrayFeatures);
      });
    return () =>
      database().ref(`/users/${user.uid}/remote/${remoteId}/feature`).off('value', onValueChange);
  }, [user.uid, remoteId, update]);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/notifications`)
      .on('value', (snapshot) => {
        if (snapshot.val() === null) {
          setListNotificationFeature([]);
        } else if (snapshot.val()) {
          Object.entries(snapshot.val()).map((e, index) => (arrayNotification[index] = e));
          if (arrayNotification?.length > 0) {
            setListNotificationFeature(arrayNotification);
          }
        }
      });
    return () => database().ref(`/users/${user.uid}/notifications`).off('value', onValueChange);
  }, [user.uid]);

  useEffect(() => {
    if (listNotificationFeature?.length <= 0 && isLoadingFeature === true) {
      setIsLoadingFeature(false);
      setUpdate(!update);
      Alert.alert('', `Thực hiện tính năng của thiết bị "${remoteName}" thành công`, [
        {text: 'OK', onPress: () => {}},
      ]);
    }
  }, [listNotificationFeature]);
  const onPressFeature = (feature: any) => {
    setIsLoadingFeature(true);
    database()
      .ref(`/users/${user.uid}/notifications`)
      .push({
        type: 'send',
        url: `users/${user.uid}/remote/${remoteId}/feature/${feature?.[0]}/value`,
        device_id: `${feature?.[1]?.device_id}`,
      });
  };
  const deleteFeature = (feature: any) => {
    database().ref(`/users/${user.uid}/remote/${remoteId}/feature/${feature?.[0]}`).remove();
    Alert.alert(
      '',
      `Xoá tính năng "${feature?.[1]?.name}" của thiết bị "${remoteName}"" thành công`,
      [
        {
          text: 'OK',
          onPress: () => replace('ListFeatures', {remote: props?.route?.params?.remote}),
        },
      ],
    );
  };
  const onDeleteFeature = (el: any) => {
    Alert.alert('', `Xác nhận xoá tính năng "${el?.[1]?.name}" của thiết bị "${remoteName}"?`, [
      {text: 'Cancel', onPress: () => console.log('chh_log ---> cancel delete')},
      {text: 'OK', onPress: () => deleteFeature(el)},
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
          <Loading isLoading={isLoadingFeature} />
          <View style={stylesSheet.titleRemote}>
            <Text style={stylesSheet.titleAlign}>{`Tính năng của thiết bị:`}</Text>
            <Text
              style={stylesSheet.titleAlign}>{`${props?.route?.params?.remote?.[1]?.name}`}</Text>
          </View>
          {listFeatures
            ? listFeatures.map((el: any) => {
                console.log('chh_log --->listFeatures: el', el?.[1]?.name);
                return (
                  <LinearGradient
                    key={el[0]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#ec4427', '#f37e33']}
                    style={stylesSheet.linearGradientBottom}>
                    <TouchableOpacity
                      style={stylesSheet.button}
                      delayLongPress={500}
                      disabled={isLoadingFeature}
                      onLongPress={() => onDeleteFeature(el)}
                      onPress={() => onPressFeature(el)}>
                      <Text style={stylesSheet.buttonText}>{el?.[1]?.name}</Text>
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
            <TouchableOpacity
              style={stylesSheet.button}
              onPress={() => push('InputFeature', {remote: props?.route?.params?.remote})}>
              <Text style={stylesSheet.buttonText}>{t('addFeature')}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(ListFeatures);
