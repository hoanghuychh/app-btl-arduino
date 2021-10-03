import React, { memo } from 'react';
import { View } from 'react-native';
import Loader from 'react-native-modal-loader';
import stylesSheet from './styles';

function Loading({isLoading}) {
  console.log('chh_log ---> isLoading in loading', isLoading);
  if (isLoading)
    return (
      <View style={stylesSheet.loading}>
        <Loader loading={isLoading} color="#ec4427" />
      </View>
    );
  return null;
}
export default memo(Loading);
