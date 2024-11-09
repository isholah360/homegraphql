import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Login: undefined;
  Splash: undefined;
  Onboarding: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Splash"
>;
const { width, height } = Dimensions.get("window");

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColorAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Navigate to Login screen after animation completes
      navigation.replace("Onboarding");
    });
  }, []);

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#2F50C1"],
  });

  return (
    <Animated.View style={styles.container}>
      <StatusBar
        backgroundColor="#156651" // Same as container background
        //  barStyle="light-content" // Use light text for dark background
      />
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require("../assets/images/Logo.png")}
          style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
          resizeMode="contain"
        />
      </View>
    </Animated.View>
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

export default SplashScreen;
