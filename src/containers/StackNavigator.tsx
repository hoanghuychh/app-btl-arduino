import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import InputFeature from '../components/inputFeature';
import InputRemote from '../components/inputRemote';
import ATTT from './ATTT';
import ChooseGift from './ChooseGift';
import Home from './Home';
import Inevitable from './Inevitable';
import IntroACT from './IntroACT';
import ListDevices from './ListDevies';
import ListFeatures from './ListFeatures';
import Share from './Share';
import Thanks from './Thanks';
import ThanksIntroACT from './ThanksIntroACT';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Inevitable" component={Inevitable} />
      <Stack.Screen name="ListFeatures" component={ListFeatures} />
      <Stack.Screen name="ATTT" component={ATTT} />
      <Stack.Screen name="InputRemote" component={InputRemote} />
      <Stack.Screen name="InputFeature" component={InputFeature} />
      <Stack.Screen
        name="Thanks"
        component={Thanks}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="IntroACT" component={IntroACT} />
      <Stack.Screen name="Share" component={Share} />
      <Stack.Screen name="ChooseGift" component={ChooseGift} />
      <Stack.Screen name="Thanks2" component={ThanksIntroACT} />
      <Stack.Screen name="ListDevices" component={ListDevices} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
