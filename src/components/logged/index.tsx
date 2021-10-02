import database from '@react-native-firebase/database';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { push } from 'src/lib/NavigationService';
import useSelector from 'src/utils/useSelector';
import stylesSheet from './styles';
function Logged() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state?.users);
  console.log('chh_log ---> user', user);

  const onAddDevice1 = () => {
    database()
      .ref(`/users/${user.uid}/remote/1/feature/1`)
      .set({
        feature_id: '1',
        name: 'feature name 1',
        value: [1, 2, 3],
      })
      .then(() => console.log('Data set.'));
    // const reference = database()
    //   .ref(`/users/${user.uid}`)
    //   .once('value')
    //   .then((snapshot) => {
    //     console.log('User data: ', snapshot.val());
    //   });
    // console.log('chh_log ---> reference', reference);
  };
  const onCreate = () => {
    database().ref(`/`).push({
      name: 'ab',
      describe: 'ab',
    });
  };
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
