import database from '@react-native-firebase/database';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { push } from 'src/lib/NavigationService';
import TopbarBack from '../components/componentBack';
import stylesSheet from './styles';

function ListFeatures(props: any) {
  const remoteId = props?.route?.params?.remote?.[0];
  const {t} = useTranslation();
  const {user} = useSelector((state: any) => state?.users);
  const [listFeatures, setListFeatures] = useState([]);
  console.log('chh_log ---> listFeatures', listFeatures);
  const array: any = [];
  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/remote/${remoteId}/feature`)
      .on('value', (snapshot) => {
        console.log('chh_log ---> snapshot', snapshot.val());
        if (snapshot.val()) {
          console.log('chh_log ---> snapshot.val()', snapshot.val());
          Object.entries(snapshot.val()).map((e, index) => (array[index] = e));
        }
        if (array?.length > 0) setListFeatures(array);
        console.log('chh_log ---> array', array);
      });

    return () =>
      database().ref(`/users/${user.uid}/remote/${remoteId}/feature`).off('value', onValueChange);
  }, [user.uid, remoteId]);
  const onPressFeature = (el: any) => {
    console.log('chh_logonPressFeature ---> el', el);
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
            <Text
              style={
                stylesSheet.title
              }>{`Thiết bị: ${props?.route?.params?.remote?.[1]?.name}`}</Text>
          </View>
          {listFeatures
            ? listFeatures.map((el: any) => {
                console.log('chh_log ---> el');
                return (
                  <LinearGradient
                    key={el[0]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#ec4427', '#f37e33']}
                    style={stylesSheet.linearGradientBottom}>
                    <TouchableOpacity style={stylesSheet.button} onPress={() => onPressFeature(el)}>
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
