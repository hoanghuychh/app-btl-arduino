import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import Icon from 'react-native-easy-icon';

import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';

import Home from 'src/containers/Home';
import Settings from 'src/containers/Settings';
import {sleep} from './utils/async';

export type AppTabParamList = {
  Home: undefined;
  Settings: {userID?: string};
};

const Tab = createBottomTabNavigator();

const App = () => {
  const init = async () => {
    await sleep(100);
    // …do multiple async tasks
  };

  React.useEffect(() => {
    init().finally(() => {
      RNBootSplash.hide({duration: 150}); // fade animation
    });
  }, []);

  const {t} = useTranslation();
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Tab.Navigator initialRouteName="home">
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: t('home'),
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                type="material-community"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="settings"
          component={Settings}
          options={{
            tabBarLabel: t('settings'),
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name={focused ? 'cog' : 'cog-outline'}
                type="material-community"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </ApplicationProvider>
  );
};

export default App;
