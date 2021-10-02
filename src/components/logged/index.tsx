import database from '@react-native-firebase/database';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import useSelector from 'src/utils/useSelector';
import stylesSheet from './styles';
function Logged() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state?.users);
  console.log('chh_log ---> user', user);

  const onAddDevice = () => {
    database()
      .ref(`/users/${user.uid}/remote/`)
      .set({
        remote_id: '2',
        value: '2',
        name: 'remote name 2',
      })
      .then((e) => {
        console.log('chh_log ---> e', e);
        console.log('Data set.');
      });
  };
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
  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#ec4427', '#f37e33']}
        style={stylesSheet.linearGradientBtnAdd}>
        <TouchableOpacity style={stylesSheet.button} onPress={onAddDevice1}>
          <Text style={stylesSheet.buttonText}>{t('add feature')}</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#ec4427', '#f37e33']}
        style={stylesSheet.linearGradientBtnAdd}>
        <TouchableOpacity style={stylesSheet.button} onPress={onAddDevice}>
          <Text style={stylesSheet.buttonText}>{t('addDevice')}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}
export default memo(Logged);
