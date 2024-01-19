// From: https://reactnavigation.org/docs/navigating-without-navigation-prop/
import * as React from 'react';
import { DrawerActions } from '@react-navigation/native';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export function toggleDrawer() {
  navigationRef.current.dispatch(DrawerActions.toggleDrawer());
}

export function goBackOrIfParamsOrDefault(targetScreen, defaultScreen) {
  const currentRoute = navigationRef.current.getCurrentRoute();
  const hasDefinedParams = Object.values(currentRoute.params).some(v => v);
  if (navigationRef.current.canGoBack()) {
    navigationRef.current.goBack();
  } else if (currentRoute && hasDefinedParams) {
    navigate(targetScreen, currentRoute.params);
  } else {
    navigate(defaultScreen);
  }
}
