import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
} from "react-native";

const { width, height } = Dimensions.get("window");

const MyAccount: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#156651" // Same as container background
        //  barStyle="light-content" // Use light text for dark background
      />
      <View style={styles.logoContainer}>
        <Text>My Account page</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#156651", // Dark green color from the image
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 335, // 20% of screen width
    height: 146,
    tintColor: "#FFFFFF",
  },
  text: {
    width: width * 0.5, // 50% of screen width
    height: width * 0.1,
    marginTop: 10,
    tintColor: "#FFFFFF",
  },
});

export default MyAccount;
