import React, { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import stylesSheet from './styles';

function Loading({isLoading}) {
  console.log('chh_log ---> isLoading in loading', isLoading);
  if (isLoading)
    return (
      <View style={stylesSheet.loading}>
        <ActivityIndicator size="large" color="#ec4427" />
      </View>
    );
  return null;
}
export default memo(Loading);
