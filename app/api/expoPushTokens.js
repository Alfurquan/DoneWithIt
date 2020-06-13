import client from "./client";

const registerToken = (pushToken) =>
  client.post("/expoPushTokens", { token: pushToken });

export default {
  registerToken,
};
