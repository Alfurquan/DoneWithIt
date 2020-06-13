import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import ContactSellerForm from "../components/ContactSellerForm";
import listings from "../api/listings";

function ListingDetailsScreen({ route }) {
  const listing = route.params;

  const listingImages = listing.images.map((img) => img.url);

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
    >
      <SliderBox images={listingImages} autoplay sliderBoxHeight={250} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>${listing.price}</Text>
        <View style={styles.userContainer}>
          <ListItem
            isNetworkImage={listing.user.profilePic != null}
            image={
              listing.user.profilePic == null
                ? require("../assets/user.jpg")
                : listing.user.profilePic.url
            }
            title={listing.user.name}
            subTitle={listing.user.email}
          />
        </View>
        <ContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
