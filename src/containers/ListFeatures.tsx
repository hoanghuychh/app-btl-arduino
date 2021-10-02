import database from '@react-native-firebase/database';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { push } from 'src/lib/NavigationService';
import stylesSheet from './styles';

function ListFeatures(props: any) {
  const remoteId = props?.route?.params?.remote?.[0];
  console.log('chh_log ---> remoteId', remoteId);
  console.log('chh_log ---> props', props);
  const {t} = useTranslation();
  const {user} = useSelector((state: any) => state?.users);
  const [listFeatures, setListFeatures] = useState([]);
  const [isFeature, setIsFeature] = useState(false);
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
          setIsFeature(true);
        }
        if (array?.length > 0) setListFeatures(array);
        console.log('chh_log ---> array', array);
      });

    return () =>
      database().ref(`/users/${user.uid}/remote/${remoteId}/feature`).off('value', onValueChange);
  }, [user.uid, remoteId]);
  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
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
                    <TouchableOpacity
                      style={stylesSheet.button}
                      onPress={() => push('Thanks2', {})}>
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
