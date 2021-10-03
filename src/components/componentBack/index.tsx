import React, { memo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import stylesSheet from 'src/containers/styles';
import { goBack } from 'src/lib/NavigationService';

function TopbarBack({}) {
  return (
    <View style={stylesSheet.topbar}>
      <TouchableOpacity style={stylesSheet.button} onPress={() => goBack()}>
        <Image style={{width: 45, height: 45}} source={require('../../../assets/icon_back.png')} />
      </TouchableOpacity>
    </View>
  );
}
export default memo(TopbarBack);
