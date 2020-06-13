import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/Text";
import ProfileImagePicker from "../components/ProfileImagePicker";
import AppButton from "../components/Button";
import usersApi from "../api/users";
import UploadScreen from "./UploadScreen";
import routes from "../navigation/Routes";
import useAuth from "../auth/useAuth";

function EditProfileScreen({ route, navigation }) {
  const user = route.params;
  const [userPic, setUserPic] = useState(
    user.profilePic == null ? null : user.profilePic.url
  );
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { storeUser } = useAuth();

  const handleSubmit = async () => {
    setProgress(0);
    setUploadVisible(true);
    const result = await usersApi.updateUserDetails(userPic, (progress) =>
      setProgress(progress)
    );
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the picture");
    }
    storeUser(result.data);
    navigation.navigate(routes.ACCOUNT);
  };

  return (
    <Screen style={styles.screen}>
      <UploadScreen
        progress={progress}
        visible={uploadVisible}
        onDone={() => setUploadVisible(false)}
      />
      <View style={styles.imagePicker}>
        {userPic == null ? (
          <Image style={styles.image} source={require("../assets/user.jpg")} />
        ) : (
          <Image style={styles.image} source={{ uri: userPic }} />
        )}
        <ProfileImagePicker onChangeImage={(uri) => setUserPic(uri)}>
          <AppText style={styles.text}>Change display picture</AppText>
        </ProfileImagePicker>
        <AppButton title="Save" style={styles.button} onPress={handleSubmit} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    marginVertical: 30,
  },
  imagePicker: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  screen: {
    backgroundColor: colors.white,
  },
  text: {
    color: colors.primary,
    marginVertical: 10,
  },
});

export default EditProfileScreen;
