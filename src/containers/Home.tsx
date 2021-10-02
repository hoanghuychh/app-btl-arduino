import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, { memo, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { setUser } from 'src/actions/usersActions';
import { push } from 'src/lib/NavigationService';
import useSelector from 'src/utils/useSelector';
import Logged from '../components/logged';
import stylesSheet from './styles';

function Home() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state?.users);
  console.log('chh_log ---> test', user);
  const [username, setUsername] = useState('hoanghuychhdev@gmail.com');
  const [password, setPassword] = useState('123456');
  const onSignup = () => {
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then((e: any) => {
        database()
          .ref(`/users/${e?.user?._user?.uid}/`)
          .set({
            user_id: e?.user?._user?.uid,
            email: e?.user?._user?.email,
            displayName: e?.user?._user?.displayName,
            phoneNumber: e?.user?._user?.phoneNumber,
          })
          .then(() => {
            dispatch(setUser(e?.user?._user));
            console.log('chh_log ---> User account created id record in database!');
          })
          .then(() => {
            Alert.alert('', 'Đăng ký thành công', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            console.log('chh_log ---> User account created & signed in!');
            // push('HavePlan', {});
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Đăng ký thất bại', 'That email address is already in use!', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Đăng ký thất bại', 'That email address is invalid!', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
        console.error(error);
      });
  };
  const onLogin = () => {
    auth()
      .signInWithEmailAndPassword(username, password)
      .then((e: any) => {
        dispatch(setUser(e?.user?._user));
        console.log('chh_log ---> User account signed in!');
        // push('HavePlan', {});
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Đăng nhập thất bại', 'Mật khẩu không chính xác!', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert('Đăng nhập thất bại', 'Tài khoản chưa đăng ký!', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else
          Alert.alert('Đăng nhập thất bại', error?.message, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
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
            <Logged />
          ) : (
            <>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ec4427', '#f37e33']}
                style={stylesSheet.linearGradient}>
                <TextInput
                  style={stylesSheet.input}
                  onChangeText={setUsername}
                  value={username}
                  placeholder="Tài khoản"
                  placeholderTextColor="#bdc3c7"
                />
              </LinearGradient>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ec4427', '#f37e33']}
                style={stylesSheet.linearGradient}>
                <TextInput
                  style={stylesSheet.input}
                  onChangeText={setPassword}
                  value={password}
                  textContentType="password"
                  secureTextEntry={true}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#bdc3c7"
                />
              </LinearGradient>
              <View style={stylesSheet.wrapSocial}>
                <TouchableOpacity style={stylesSheet.button} onPress={() => push('ATTT', {})}>
                  <Image
                    style={{width: 70, height: 70}}
                    source={require('../../assets/icon_fb.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={stylesSheet.button} onPress={() => push('ATTT', {})}>
                  <Image
                    style={{width: 70, height: 70}}
                    source={require('../../assets/icon_gg.png')}
                  />
                </TouchableOpacity>
              </View>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ec4427', '#f37e33']}
                style={stylesSheet.linearGradientBtn}>
                <TouchableOpacity style={stylesSheet.button} onPress={onLogin}>
                  <Text style={stylesSheet.buttonText}>{t('login')}</Text>
                </TouchableOpacity>
              </LinearGradient>
              <View style={stylesSheet.wrapSignup}>
                <TouchableOpacity style={stylesSheet.button} onPress={onSignup}>
                  <Text style={stylesSheet.textSignup}>{t('signup')}</Text>
                </TouchableOpacity>
              </View>
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

export default memo(Home);
