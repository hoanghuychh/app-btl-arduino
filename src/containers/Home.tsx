import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { push } from 'src/lib/NavigationService';
import stylesSheet from './styles';

function Home() {
  const {t} = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onSignup = () => {};
  const onLogin = () => push('HavePlan', {});
  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
          <View style={stylesSheet.logo}>
            <Image style={stylesSheet.imageLogo} source={require('../../assets/logo.png')} />
          </View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#ec4427', '#f37e33']}
            style={stylesSheet.linearGradient}>
            {/* <TouchableOpacity style={stylesSheet.button} onPress={() => push('Inevitable', {})}>
              <Text style={stylesSheet.buttonText}>{t('inevitable')}</Text>
            </TouchableOpacity> */}
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
              <Image style={{width: 70, height: 70}} source={require('../../assets/icon_fb.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={stylesSheet.button} onPress={() => push('HavePlan', {})}>
              <Image style={{width: 70, height: 70}} source={require('../../assets/icon_gg.png')} />
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
