import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@ui-kitten/components';
import Colors from 'src/constants/colors';

function Settings() {
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.container}>
      <Text>{t('language')}</Text>
      <Button style={styles.button} onPress={() => i18n.changeLanguage('en')}>
        {t('English')}
      </Button>
      <Button style={styles.button} onPress={() => i18n.changeLanguage('vn')}>
        {t('Việt Nam')}
      </Button>
    </View>
  );
}

export default memo(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.aliceBlue,
  },
  button: {
    margin: 2,
    marginTop: 10,
    minWidth: 150,
  },
});
