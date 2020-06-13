import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import routes from "../navigation/Routes";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MY_LISTINGS,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation, route }) {
  const { logout, user } = useAuth();

  return (
    <>
      <Screen style={styles.screen}>
        {user && (
          <View style={styles.container}>
            <ListItem
              onPress={() => navigation.navigate(routes.EDIT_PROFILE, user)}
              title={user.name}
              subTitle={user.email}
              isNetworkImage={user.profilePic != null}
              image={
                user.profilePic == null
                  ? require("../assets/user.jpg")
                  : user.profilePic.url
              }
            />
          </View>
        )}
        <View style={styles.container}>
          <FlatList
            data={menuItems}
            keyExtractor={(menuItem) => menuItem.title}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                IconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
                onPress={() => navigation.navigate(item.targetScreen)}
              />
            )}
          />
        </View>
        <ListItem
          onPress={() => logout()}
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginBottom: 20,
  },
});

export default AccountScreen;
