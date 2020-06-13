import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import logger from "../utility/logger";

function ProfileImagePicker({ children, onChangeImage }) {
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  };

  useEffect(() => {
    requestPermission;
  }, []);

  const handleImageSelect = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      logger.log("Error reading an image");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleImageSelect}>
      {children}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProfileImagePicker;
