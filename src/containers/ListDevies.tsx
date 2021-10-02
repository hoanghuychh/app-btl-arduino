import database from '@react-native-firebase/database';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { push } from 'src/lib/NavigationService';
import useSelector from 'src/utils/useSelector';
import stylesSheet from './styles';

function ListDevices() {
  const {t} = useTranslation();
  const {user} = useSelector((state: any) => state?.users);
  const [listDevices, setListDevices] = useState([]);
  console.log('chh_log ---> listDevices', listDevices);
  const array: any = [];
  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/remote/`)
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());
        Object.entries(snapshot.val()).map((e, index) => (array[index] = e));
        console.log('chh_log ---> array', array);
        if (array) setListDevices(array);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${user.uid}`).off('value', onValueChange);
  }, [user.uid]);

  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
          {listDevices
            ? listDevices.map((el: any) => {
                console.log('chh_log ---> el');
                return (
                  <LinearGradient
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(ListDevices);
