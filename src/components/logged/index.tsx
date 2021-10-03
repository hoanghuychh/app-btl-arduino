import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { push } from 'src/lib/NavigationService';
import stylesSheet from './styles';
function Logged() {
  const {t} = useTranslation();
  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#ec4427', '#f37e33']}
        style={stylesSheet.linearGradientBtnAdd}>
        <TouchableOpacity style={stylesSheet.button} onPress={() => push('ListDevices')}>
          <Text style={stylesSheet.buttonText}>{t('listDevices')}</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#ec4427', '#f37e33']}
        style={stylesSheet.linearGradientBtnAdd}>
        <TouchableOpacity style={stylesSheet.button} onPress={() => push('InputRemote')}>
          <Text style={stylesSheet.buttonText}>{t('addDevice')}</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#ec4427', '#f37e33']}
        style={stylesSheet.linearGradientBtnAdd}>
        <TouchableOpacity style={stylesSheet.button} onPress={() => push('ListSmartRemote')}>
          <Text style={stylesSheet.buttonText}>{t('Smart Remote')}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}
export default memo(Logged);
