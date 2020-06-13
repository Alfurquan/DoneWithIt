import React from "react";
import { Keyboard, Alert } from "react-native";
import messagesApi from "../api/messages";
import { Notifications } from "expo";
import * as Yup from "yup";
import { Form, FormField, SubmitButton } from "./forms";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing._id);
    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "Could not send the messsage!");
    }

    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: "Awesome!",
      body: "Your message was sent to the seller",
    });
  };

  return (
    <Form
      initialValues={{ message: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormField
        name="message"
        multiline
        maxLength={255}
        numberOfLines={3}
        placeholder="Send a message.. "
      />
      <SubmitButton title="Contact Seller " />
    </Form>
  );
}

export default ContactSellerForm;
