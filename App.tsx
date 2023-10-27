/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { DataProvider } from './src/hooks';
import AppNavigation from './src/navigation/App';
import { LoginProvider } from './src/hooks/LoginContext';
import * as Notifications from 'expo-notifications';
import { View } from 'react-native';
import { Text } from 'react-native';

export default function App() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    registerForPushNotifications();

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      // Handle received notification here
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      // Handle notification response here
      console.log('Notification response:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function registerForPushNotifications() {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo push token:', token);
    } catch (error) {
      console.error('Error registering for push notifications:', error);
    }
  }

  return (
    <LoginProvider>
      <DataProvider>
        {/* <AppNavigation /> */}
        {notification && (
          <View>
            <Text>Received Notification:</Text>
            <Text>Title: {notification.request.content.title}</Text>
            <Text>Body: {notification.request.content.body}</Text>
          </View>
        )}
      </DataProvider>
    </LoginProvider>
  );
}
