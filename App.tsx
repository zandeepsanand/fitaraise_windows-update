/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';

import React, {useEffect} from 'react';

import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';
import {LoginProvider} from './src/hooks/LoginContext';
import { Alert } from 'react-native';

export default function App() {
  // const requestUserPermission = async () => {
  //   try {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //     } else {
  //       console.log('Authorization status not granted');
  //     }
  //   } catch (error) {
  //     console.error('Error requesting permission:', error);
  //   }
  // };
  // useEffect(() => {
  //   // Call the function and await it, since it's an async function
  //   (async () => {
  //     await requestUserPermission();
  //     try {
  //       const token = await messaging().getToken();
  //       console.log(token, 'token from fcm');
  //     } catch (error) {
  //       console.error('Error getting FCM token:', error);
  //     }

  //     try {
  //       const remoteMessage = await messaging().getInitialNotification();
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //     } catch (error) {
  //       console.error('Error getting initial notification:', error);
  //     }

  //     messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //     });

  //     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //       console.log('Message handled in the background!', remoteMessage);
  //     });

  //     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //       Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     });

  //     return unsubscribe;
  //   })();
  // }, []);
  return (
    <LoginProvider>
      <DataProvider>
        <AppNavigation />
      </DataProvider>
    </LoginProvider>
  );
}
