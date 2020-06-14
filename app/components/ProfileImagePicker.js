import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import logger from "../utility/logger";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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

export default ProfileImagePicker;
