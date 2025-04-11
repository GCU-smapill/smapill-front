import PushNotification from 'react-native-push-notification';

export const scheduleLocalNotification = (date, medicineName) => {
  PushNotification.localNotificationSchedule({
    channelId: 'medication-channel',
    title: '복약 알림 💊',
    message: `${medicineName} 드실 시간이에요!`,
    date: date,
    allowWhileIdle: true,
  });
};
