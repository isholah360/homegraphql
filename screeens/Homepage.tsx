import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";

const Homepage = () => {
  const data = [
    {
      id: "1",
      discount: "45% OFF",
      name: "EKERO",
      price: "$230.00",
      originalPrice: "$512.58",
      rating: "4.9 (256)",
      image: require("../assets/images/Product1.png"),
    },
    {
      id: "2",
      discount: "30% OFF",
      name: "FRIHETEN",
      price: "$300.00",
      originalPrice: "$429.00",
      rating: "4.7 (190)",
      image: require("../assets/images/Product2.png"),
    },
    {
      id: "3",
      discount: "25% OFF",
      name: "POÄNG",
      price: "$150.00",
      originalPrice: "$200.00",
      rating: "4.8 (320)",
      image: require("../assets/images/Product3.png"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <StatusBar backgroundColor="#f5f5f5" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#7D7D7D"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search candles"
            placeholderTextColor="#7D7D7D"
          />
          <TouchableOpacity>
            <Feather
              name="camera"
              size={20}
              color="#7D7D7D"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Right Notification Icon */}
        <TouchableOpacity>
          <MaterialIcons name="notifications-none" size={24} color="#7D7D7D" />
        </TouchableOpacity>
      </View>
      {/* Location Information */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 12,
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Feather name="map-pin" size={16} color="#7D7D7D" />
          <Text style={styles.locationText}>
            Deliver to{" "}
            <Text style={styles.locationAddress}>
              3517 W. Gray St. Utica, Pennsylvania
            </Text>
          </Text>
        </View>

        <Feather
          name="chevron-down"
          style={{ display: "flex", justifyContent: "flex-end" }}
          size={16}
          color="#7D7D7D"
        />
      </View>

      {/* Hero Section */}
      <Image
        source={require("../assets/images/Hero.png")}
        style={{ height: 199, width: "100%", marginVertical: 22 }}
        resizeMode="cover"
      />

      <View style={{ paddingTop: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 24,
              color: "#404040",
              lineHeight: 28.8,
            }}
          >
            Special Offers
          </Text>
          <Text
            style={{
              color: "#156651",
              fontWeight: "700",
              textDecorationLine: "underline",
            }}
          >
            See More
          </Text>
        </View>

        <View style={{ padding: 14 }}>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.details}>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                  </View>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                  <View style={styles.ratingContainer}>
                    <Entypo name="star" size={18} color="#EBB65B" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "#F5F5F5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 44,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  locationText: {
    fontSize: 14,
    color: "#404040",
    marginHorizontal: 5,
  },
  locationAddress: {
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    height: 246,
    width: 152,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 16,
    marginRight: 16, // Space between cards
  },
  image: {
    height: 121,
    width: 120,
    alignSelf: "center",
  },
  details: {
    paddingHorizontal: 16,
    gap: 2,
    bottom: 14,
  },
  discountBadge: {
    backgroundColor: "#E44A4A",
    height: 20,
    width: 51,
    justifyContent: "center",
    alignItems: "center",
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  discountText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 10,
  },
  productName: {
    fontWeight: "400",
    color: "#404040",
    paddingVertical: 6,
  },
  price: {
    fontWeight: "700",
    color: "#404040",
    fontSize: 20,
  },
  originalPrice: {
    fontWeight: "400",
    color: "#404040",
    fontSize: 12,
    textDecorationLine: "line-through", // Shows the original price as crossed out
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "400",
  },
});
