import {NavigationAction, NavigationContainerRef, StackActions} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

export class NavigationService {
  public static isReady: boolean;

  public static navigate(name: string, params?: Record<string, unknown>) {
    if (this.isReady && navigationRef.current) {
      navigationRef.current.navigate(name, params);
    } else {
      // You can decide what to do if the app hasn't mounted
      // You can ignore this, or add these actions to a queue you can call later
    }
  }

  public static dispatch(action: NavigationAction) {
    if (this.isReady && navigationRef.current) navigationRef.current.dispatch(action);
  }

  // add other navigation functions that you need and export them
}
export function push(name: string, params?: Record<string, unknown>) {
  navigationRef.current && navigationRef.current.dispatch(StackActions.push(name, params));
}
