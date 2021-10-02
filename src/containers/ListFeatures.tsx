import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { push } from 'src/lib/NavigationService';
import stylesSheet from './styles';

function ListFeatures() {
  const {t} = useTranslation();
  const current = useSelector((state: any) => state?.app?.current);
  return (
    <SafeAreaView style={stylesSheet.safeArea}>
      <ScrollView style={stylesSheet.scrollView}>
        <View style={stylesSheet.container}>
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

export default memo(ListFeatures);
