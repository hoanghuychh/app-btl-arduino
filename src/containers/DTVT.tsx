import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {push} from 'src/lib/NavigationService';
import stylesSheet from './styles';
import LinearGradient from 'react-native-linear-gradient';

function DTVT() {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
          <View style={stylesSheet.wrapImage}>
            <Image style={stylesSheet.image} source={require('../../assets/game-DTVT.png')} />
          </View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#ec4427', '#f37e33']}
            style={stylesSheet.linearGradientBottom}>
            <TouchableOpacity style={stylesSheet.button} onPress={() => push('Share', {})}>
              <Text style={stylesSheet.buttonText}>{t('continue')}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(DTVT);
