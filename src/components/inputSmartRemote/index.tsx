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
import { replace } from 'src/lib/NavigationService';
import useSelector from 'src/utils/useSelector';
import TopbarBack from '../componentBack';
import stylesSheet from './styles';

function InputSmartRemote(props) {
  console.log('chh_log ---> props', props);
  const smart_remotes = props?.route?.params?.smart_remotes;
  const {t} = useTranslation();
  const {user} = useSelector((state: any) => state?.users);
  const [nameSmartRemote, setNameSmartRemote] = useState('');
  const onEdit = () => {
    if (nameSmartRemote) {
      database().ref(`/users/${user.uid}/smart_remotes/${smart_remotes?.[0]}`).update({
        name: nameSmartRemote,
      });
      Alert.alert('', `Cập nhật Smart Remote "${nameSmartRemote}" thành công!`, [
        {text: 'OK', onPress: () => replace('Home')},
      ]);
    } else {
      Alert.alert('Cập nhật Smart Remote thất bại', 'Vui lòng điền kiểm tra lại!', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
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
                onChangeText={setNameSmartRemote}
                value={nameSmartRemote}
                placeholder="Sửa tên Smart Remote"
                placeholderTextColor="#bdc3c7"
              />
            </LinearGradient>
          </>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#ec4427', '#f37e33']}
            style={stylesSheet.linearGradientBtnAdd}>
            <TouchableOpacity style={stylesSheet.button} onPress={onEdit}>
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

export default memo(InputSmartRemote);
