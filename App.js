import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

export default function App() {
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(
          " =============== I have received the notification  ==============="
        );
        console.log(notification);
        const userName = notification.request.content.data.userName;
        console.log(userName);
      }
    );
    const subscription2 =  Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(
        " =============== I have received the notification and tapped on it ==============="
      );
      console.log(response);
    })
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first Local Notification",
        body: "This is the body of the notification",
        data: { userName: "Ebuka" },
      },
      trigger: { seconds: 5 },
    });
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
