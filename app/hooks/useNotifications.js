import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { useEffect } from "react";
import logger from "../utility/logger";

import expoPushTokensApi from "../api/expoPushTokens";

export const useNotifications = (notificationListener) => {
  useEffect(() => {
    registerForPushNotifications();
    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.registerToken(token);
    } catch (error) {
      logger.log("Error getting a push token", error);
    }
  };
};
