import client from "./client";

const send = (message, listingId) => {
  return client.post("/messages", { message, listingId });
};

const getMessages = () => client.get("/messages");

export default {
  send,
  getMessages,
};
