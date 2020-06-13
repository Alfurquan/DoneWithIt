import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="MyListings"
      component={MyListingsScreen}
      options={{ headerTitle: "My Listings" }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{ headerTitle: "Edit Profile" }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
