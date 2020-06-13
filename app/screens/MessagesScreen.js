import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import useApi from "../hooks/useApi";
import messagesApi from "../api/messages";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import Button from "../components/Button";

function MessagesScreen(props) {
  const [refreshing, setRefreshing] = useState(false);

  const { data: messages, error, loading, request: loadMessages } = useApi(
    messagesApi.getMessages
  );

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        {error && (
          <>
            <AppText>Couldn't retrieve the messages</AppText>
            <Button title="Retry " onPress={loadMessages} />
          </>
        )}
        <FlatList
          data={messages}
          keyExtractor={(message) => message._id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.fromUser.name}
              subTitle={item.content}
              isNetworkImage={item.fromUser.profilePic != null}
              image={
                item.fromUser.profilePic != null
                  ? item.fromUser.profilePic.url
                  : require("../assets/user.jpg")
              }
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={loadMessages}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
