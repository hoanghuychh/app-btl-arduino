import auth from '@react-native-firebase/auth';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreState } from 'src/actions/appActions';
import { setUser } from 'src/actions/usersActions';
import stylesSheet from './styles';

function Settings({navigation}: {navigation: any}) {
  const {t} = useTranslation();
  const {user} = useSelector((state: any) => state?.users);
  const dispatch = useDispatch();
  const setHCM = () => {
    dispatch(setStoreState({current: 'hcm'}));
    navigation.navigate('home');
  };
  const setHN = () => {
    dispatch(setStoreState({current: 'hanoi'}));
    navigation.navigate('home');
  };
  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(setUser({}));
        navigation.navigate('home');
        console.log('User signed out!');
      });
  };
  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
          <View style={stylesSheet.logo}>
            <Image style={stylesSheet.imageLogo} source={require('../../assets/logo.png')} />
          </View>
          {user?.uid !== undefined ? (
            <View>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ec4427', '#f37e33']}
                style={[stylesSheet.buttonMenu, {marginVertical: 20}]}>
                <TouchableOpacity style={stylesSheet.button} onPress={() => onLogout()}>
                  <Text style={stylesSheet.buttonText}>{t('logout')}</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ec4427', '#f37e33']}
                style={[stylesSheet.buttonMenu, {marginVertical: 20}]}>
                <TouchableOpacity style={stylesSheet.button} onPress={() => {}}>
                  <Text style={stylesSheet.buttonText}>{t('selectLang')}</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          ) : (
            <>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ec4427', '#f37e33']}
                style={[stylesSheet.linearGradient, {marginVertical: 20}]}>
                <TouchableOpacity style={stylesSheet.button} onPress={() => setHN()}>
                  <Text style={stylesSheet.buttonText}>{t('TIẾNG VIỆT')}</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ec4427', '#f37e33']}
                style={[stylesSheet.linearGradient, {marginVertical: 20}]}>
                <TouchableOpacity style={stylesSheet.button} onPress={() => setHCM()}>
                  <Text style={stylesSheet.buttonText}>{t('ENGLISH')}</Text>
                </TouchableOpacity>
              </LinearGradient>
            </>
          )}
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

export default memo(Settings);
