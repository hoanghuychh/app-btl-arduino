import auth from '@react-native-firebase/auth';
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
import stylesSheet from './styles';

function Home() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state?.users);
  console.log('chh_log ---> test', user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onSignup = () => {
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then((e) => {
        dispatch(setUser(e));
        Alert.alert('', 'Đăng ký thành công', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        console.log('chh_log ---> User account created & signed in!');
        push('HavePlan', {});
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
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
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  const onAddDevice = () => {};
  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
          <View style={stylesSheet.logo}>
            <Image style={stylesSheet.imageLogo} source={require('../../assets/logo.png')} />
          </View>
          {user?.uid !== undefined ? (
            <>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ec4427', '#f37e33']}
                style={stylesSheet.linearGradientBtnAdd}>
                <TouchableOpacity style={stylesSheet.button} onPress={onAddDevice}>
                  <Text style={stylesSheet.buttonText}>{t('addDevice')}</Text>
                </TouchableOpacity>
              </LinearGradient>
            </>
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
                <TouchableOpacity style={stylesSheet.button} onPress={() => push('HavePlan', {})}>
                  <Image
                    style={{width: 70, height: 70}}
                    source={require('../../assets/icon_fb.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={stylesSheet.button} onPress={() => push('HavePlan', {})}>
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
