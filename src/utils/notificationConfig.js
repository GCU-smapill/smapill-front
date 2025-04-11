import PushNotification from 'react-native-push-notification';

export const initializeNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('알림 도착:', notification);
    },
    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: 'medication-channel',
      channelName: 'Medication Reminders',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`채널 생성됨? ${created}`)
  );
};
