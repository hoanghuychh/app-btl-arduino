import database from '@react-native-firebase/database';
import React, { memo, useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { replace } from 'src/lib/NavigationService';
import useSelector from 'src/utils/useSelector';
import TopbarBack from '../components/componentBack';
import Loading from '../components/componentLoading';
import stylesSheet from './styles';

function SelectSmartRemote(props: any) {
  const nameFeature = props?.route?.params?.nameFeature;
  const describe = props?.route?.params?.describe;
  const remoteId = props?.route?.params?.remoteId;
  const remote = props?.route?.params?.remote;
  const {user} = useSelector((state: any) => state?.users);
  const [ListSmartRemote, setListSmartRemote] = useState([]);
  const [smartRemoteSelected, setSmartRemoteSelected] = useState(null);
  const [listNotification, setListNotification] = useState([]);
  const [featureKeyRender, setFeatureKeyRender] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const array: any = [];
  const arraySmartRemote: any = [];
  const timeOut: any = setTimeout(() => {
    if (isLoading) {
      setIsLoading(false);
      Alert.alert('Thêm chức năng Remote ảo thất bại', 'Vui lòng kiểm tra lại chức năng', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }, 20000);
  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/smart_remotes/`)
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());
        if (snapshot.val())
          Object.entries(snapshot.val()).map((e, index) => (arraySmartRemote[index] = e));
        if (arraySmartRemote) setListSmartRemote(arraySmartRemote);
      });
    return () => database().ref(`/users/${user.uid}/smart_remotes`).off('value', onValueChange);
  }, [user.uid]);

  const onAddFeature = (smartRemote: any) => {
    setSmartRemoteSelected(smartRemote);
    if (nameFeature) {
      setIsLoading(true);
      const featureKey = database().ref(`/users/${user.uid}/remote/${remoteId}/feature/`).push({
        name: nameFeature,
        describe: describe,
        device_id: smartRemote?.[0],
      });
      if (featureKey) setFeatureKeyRender(featureKey);
      database()
        .ref(`/users/${user.uid}/notifications`)
        .push({
          type: 'receive',
          url: `users/${user.uid}/remote/${remoteId}/feature/${featureKey?.key}/value`,
          device_id: smartRemote?.[0],
        });
      replace('CheckFeature', {
        remote: remote,
        nameFeature: nameFeature,
        smartRemote: smartRemoteSelected,
        featureKey: featureKeyRender,
        describe: describe,
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
          setListNotification([]);
        }
        if (snapshot.val()) Object.entries(snapshot.val()).map((e, index) => (array[index] = e));
        if (array?.length > 0) {
          setListNotification(array);
        }
      });
    return () => database().ref(`/users/${user.uid}`).off('value', onValueChange);
  }, [user.uid]);
  useEffect(() => {
    if (listNotification?.length <= 0 && isLoading === true) {
      setIsLoading(false);
      Alert.alert(
        '',
        `Thêm phím chức năng "${nameFeature}" thành công cho Remote ảo "${remote?.[1]?.name}"`,
        [
          {
            text: 'OK',
            onPress: () =>
              replace('CheckFeature', {
                remote: remote,
                nameFeature: nameFeature,
                smartRemote: smartRemoteSelected,
                featureKey: featureKeyRender,
                describe: describe,
              }),
          },
        ],
      );
      clearTimeout(timeOut);
    }
  }, [listNotification]);
  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
          <TopbarBack />
          <View style={stylesSheet.logo}>
            <Image style={stylesSheet.imageLogo} source={require('../../assets/logo.png')} />
          </View>
          <Loading isLoading={isLoading} />
          <View style={stylesSheet.titleRemote}>
            <Text style={stylesSheet.title}>{`Chọn Smart Remote thực hiện:`}</Text>
            <Text style={stylesSheet.titleAlign}>{`${nameFeature}`}</Text>
          </View>
          {ListSmartRemote
            ? ListSmartRemote.map((el: any) => {
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
                      disabled={isLoading}
                      onPress={() => onAddFeature(el)}>
                      <Text style={stylesSheet.buttonText}>{el[1]?.name}</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                );
              })
            : null}
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

export default memo(SelectSmartRemote);
