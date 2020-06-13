import client from "./client";

const register = (userInfo) => client.post("/users", userInfo);

const getUserDetails = () => {
  return client.get("/users");
};

const updateUserDetails = (profileImage, onUploadProgress) => {
  const data = new FormData();
  data.append("profileImage", {
    name: "image",
    type: "image/jpeg",
    uri: profileImage,
  });
  return client.put("/users/profile", data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  register,
  getUserDetails,
  updateUserDetails,
};
