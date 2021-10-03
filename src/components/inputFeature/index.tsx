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
import TopbarBack from '../componentBack';
import stylesSheet from './styles';
function InputFeature(props) {
  const remote = props?.route?.params?.remote;
  const {t} = useTranslation();
  const [nameFeature, setNameFeature] = useState('');
  const [describe, setDescribe] = useState('');
  const onAddFeature = () => {
    push('SelectSmartRemote', {
      nameFeature: nameFeature,
      describe: describe,
      remoteId: remote?.[0],
      remote: remote,
    });
  };
  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
          <TopbarBack />
          <View style={stylesSheet.logo}>
            <Image style={stylesSheet.imageLogo} source={require('../../../assets/logo.png')} />
          </View>
          <>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ec4427', '#f37e33']}
              style={stylesSheet.linearGradient}>
              <TextInput
                style={stylesSheet.input}
                onChangeText={setNameFeature}
                value={nameFeature}
                placeholder="Tên tính năng"
                placeholderTextColor="#bdc3c7"
              />
            </LinearGradient>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ec4427', '#f37e33']}
              style={stylesSheet.linearGradientDescribe}>
              <TextInput
                style={stylesSheet.input}
                onChangeText={setDescribe}
                value={describe}
                placeholder="Mô tả"
                placeholderTextColor="#bdc3c7"
              />
            </LinearGradient>
          </>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#ec4427', '#f37e33']}
            style={stylesSheet.linearGradientBtnAdd}>
            <TouchableOpacity style={stylesSheet.button} onPress={onAddFeature}>
              <Text style={stylesSheet.buttonText}>{t('continue')}</Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={stylesSheet.wrapKmakey}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={require('../../../assets/kmakey.png')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(InputFeature);
