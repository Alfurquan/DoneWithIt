import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import { ListItem } from "../components/lists";
import routes from "../navigation/Routes";
import AppText from "../components/Text";

function MyListingsScreen({ navigation }) {
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingsApi.getUsersListings
  );
  useEffect(() => {
    loadListings();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <AppText>Couldn't retrieve the listings</AppText>
            <Button title="Retry " onPress={loadListings} />
          </>
        )}
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing._id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={"$" + item.price}
              image={item.images[0].url}
              isNetworkImage
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
});

export default MyListingsScreen;
