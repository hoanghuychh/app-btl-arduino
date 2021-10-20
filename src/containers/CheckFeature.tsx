import database from '@react-native-firebase/database';
import React, { memo, useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { push } from 'src/lib/NavigationService';
import TopbarBack from '../components/componentBack';
import Loading from '../components/componentLoading';
import stylesSheet from './styles';

function CheckFeature(props: any) {
  const remote = props?.route?.params?.remote;
  const remoteId = props?.route?.params?.remote?.[0];
  const remoteName = props?.route?.params?.remote?.[1]?.name;
  const nameFeature = props?.route?.params?.nameFeature;
  const smartRemote = props?.route?.params?.smartRemote;
  const featureKeyRender = props?.route?.params?.featureKey;
  const describe = props?.route?.params?.describe;
  const {user} = useSelector((state: any) => state?.users);
  const [isLoading, setIsLoading] = useState(false);
  const [listNotificationFeature, setListNotificationFeature] = useState([]);
  const [isLoadingFeature, setIsLoadingFeature] = useState(false);
  const [update, setUpdate] = useState(false);
  const arrayNotification: any = [];
  const [listNotificationReAdd, setListNotificationReAdd] = useState([]);
  const arrayReAdd: any = [];

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
      Alert.alert('', `Thực hiện chức năng của Remote ảo "${remoteName}" thành công`, [
        {text: 'OK', onPress: () => {}},
      ]);
    }
  }, [listNotificationFeature]);
  const onPressFeature = () => {
    setIsLoadingFeature(true);
    database()
      .ref(`/users/${user.uid}/notifications`)
      .push({
        type: 'send',
        url: `users/${user.uid}/remote/${remoteId}/feature/${featureKeyRender?.key}/value`,
        device_id: smartRemote?.[0],
      });
  };

  const onSaveFeature = () => {
    Alert.alert(
      '',
      `Lưu phím chức năng "${nameFeature}" thành công cho Remote ảo "${remoteName}"`,
      [
        {
          text: 'OK',
          onPress: () => push('ListFeatures', {remote: remote}),
        },
      ],
    );
  };

  // reAdd feature
  const onReAddFeature = () => {
    if (nameFeature) {
      setIsLoading(true);
      setTimeout(() => {
        if (isLoading === true) {
          setIsLoading(false);
          Alert.alert('Thêm chức năng Remote ảo thất bại', 'Vui lòng kiểm tra lại chức năng', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
      }, 15000);
      const featureKey = database().ref(`/users/${user.uid}/remote/${remoteId}/feature/`).push({
        name: nameFeature,
        describe: describe,
        device_id: smartRemote?.[0],
      });
      database()
        .ref(`/users/${user.uid}/notifications`)
        .push({
          type: 'receive',
          url: `users/${user.uid}/remote/${remoteId}/feature/${featureKey?.key}/value`,
          device_id: smartRemote?.[0],
        });
    } else {
      Alert.alert('Thêm chức năng Remote ảo thất bại', 'Vui lòng điền tên chức năng', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };
  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/notifications/`)
      .on('value', (snapshot) => {
        console.log('onValueChange: ', snapshot.val());
        if (snapshot.val() === null) {
          setListNotificationReAdd([]);
        }
        if (snapshot.val())
          Object.entries(snapshot.val()).map((e, index) => (arrayReAdd[index] = e));
        if (arrayReAdd?.length > 0) {
          setListNotificationReAdd(arrayReAdd);
        }
      });
    return () => database().ref(`/users/${user.uid}`).off('value', onValueChange);
  }, [user.uid]);
  useEffect(() => {
    if (listNotificationReAdd?.length <= 0 && isLoading === true) {
      setIsLoading(false);
      Alert.alert(
        '',
        `Thêm phím chức năng "${nameFeature}" thành công cho Remote ảo "${remote?.[1]?.name}"`,
        [
          {
            text: 'OK',
            onPress: () =>
              push('CheckFeature', {
                remote: remote,
                nameFeature: nameFeature,
                smartRemote: smartRemote,
                describe: describe,
              }),
          },
        ],
      );
    }
  }, [listNotificationReAdd]);
  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
          <TopbarBack />
          <View style={stylesSheet.logo}>
            <Image style={stylesSheet.imageLogo} source={require('../../assets/logo.png')} />
          </View>
          <Loading isLoading={true} />
          <View style={stylesSheet.titleRemote}>
            <Text
              style={
                stylesSheet.titleAlign
              }>{`Thử chức năng '${nameFeature}' của Remote ảo:`}</Text>
            <Text style={stylesSheet.titleAlign}>{`${remoteName}`}</Text>
          </View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#ec4427', '#f37e33']}
            style={stylesSheet.linearGradientBottom}>
            <TouchableOpacity
              style={stylesSheet.button}
              delayLongPress={500}
              disabled={isLoadingFeature}
              onPress={onPressFeature}>
              <Text style={stylesSheet.buttonText}>Thực hiện</Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={stylesSheet.wrapSave}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ec4427', '#f37e33']}
              style={stylesSheet.linearGradientBtnAddFeatureSave}>
              <TouchableOpacity style={stylesSheet.buttonSave} onPress={onReAddFeature}>
                <Text style={stylesSheet.buttonText}>Thêm lại</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ec4427', '#f37e33']}
              style={stylesSheet.linearGradientBtnAddFeatureSave}>
              <TouchableOpacity style={stylesSheet.buttonSave} onPress={onSaveFeature}>
                <Text style={stylesSheet.buttonText}>Lưu</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={stylesSheet.wrapKmakey}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={require('../../assets/kmakey.png')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(CheckFeature);
