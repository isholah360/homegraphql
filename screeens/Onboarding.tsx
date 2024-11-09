import React, { useState } from "react";
import CurvedImage from "../components/CurvedImage";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { NavigationProp, useNavigation } from "@react-navigation/native"; // Import navigation hook

const { width } = Dimensions.get("window");

interface OnboardingSlide {
  id: number;
  image: any;
  title: string;
  description: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    image: require("../assets/images/board1.png"),
    title: "Online Home Store and Furniture",
    description:
      "Discover all style and budgets of furniture, appliances, kitchen, and more from 500+ brands in your hand.",
  },
  {
    id: 2,
    image: require("../assets/images/board2.png"),
    title: "Delivery Right to Your Doorstep",
    description:
      "Sit back, and enjoy the convenience of our drivers delivering your order to your doorstep.",
  },
  {
    id: 3,
    image: require("../assets/images/board3.png"),
    title: "Get Support From Our Skilled Team",
    description:
      "If our products don't meet your expectations, we're available 24/7 to assist you.",
  },
];

type RootStackParamList = {
  Login: undefined;
  Homepage: undefined;
  Signup: undefined;
  // Add other screens here as needed
};

// Define navigation prop type
type NavigationProps = NavigationProp<RootStackParamList>;

const Onboarding: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const navigation = useNavigation<NavigationProps>();
  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      // Navigate to Login screen if it's the last slide
      navigation.navigate("Login");
    }
  };

  const handleBack = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleSkip = () => {
    setCurrentSlideIndex(slides.length - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <Image
          source={slides[currentSlideIndex].image}
          style={styles.image}
          resizeMode="cover"
        />

        {/* <CurvedImage source={slides[currentSlideIndex].image} /> */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{slides[currentSlideIndex].title}</Text>
          <Text style={styles.description}>
            {slides[currentSlideIndex].description}
          </Text>
        </View>

        {/* Pagination dots */}
        <View style={styles.paginationContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentSlideIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        {/* Navigation buttons */}
        {/* <View style={styles.buttonContainer}>
          {currentSlideIndex > 0 ? (
            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={handleBack}
            >
              <Text style={styles.buttonTextOutline}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonPlaceholder} />
          )}

          <TouchableOpacity
            style={[styles.button, styles.buttonFilled]}
            onPress={handleNext}
          >
            <Text style={styles.buttonTextFilled}>
              {currentSlideIndex === slides.length - 1 ? "Next" : "Next"}
            </Text>
          </TouchableOpacity>
        </View> */}

        <View
          style={[
            styles.buttonContainer,
            currentSlideIndex === 0 && styles.firstSlideButtonContainer,
          ]}
        >
          {currentSlideIndex > 0 && (
            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={handleBack}
            >
              <Text style={styles.buttonTextOutline}>Back</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonFilled,
              currentSlideIndex === 0 && styles.fullWidthButton,
              currentSlideIndex > 0 && styles.sixtyWidthButton,
            ]}
            onPress={handleNext}
          >
            <Text style={styles.buttonTextFilled}>
              {currentSlideIndex === slides.length - 1 ? "Next" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: "55%",
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 38.4,
    textAlign: "center",
    marginBottom: 10,
    color: "#404040",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#717171",
    paddingHorizontal: 20,
    fontWeight: "400",
    lineHeight: 21.6,
  },
  paginationContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#156651",
  },
  // buttonContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   paddingHorizontal: 20,
  //   position: "absolute",
  //   bottom: 40,
  //   width: "100%",
  // },
  // button: {
  //   paddingVertical: 12,
  //   paddingHorizontal: 24,
  //   borderRadius: 8,
  //   minWidth: 120,
  //   alignItems: "center",
  // },
  buttonFilled: {
    backgroundColor: "#156651",
  },
  buttonOutline: {
    // borderWidth: 1,
    // borderColor: "#156651",
  },
  buttonPlaceholder: {
    minWidth: 120,
  },
  buttonTextFilled: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextOutline: {
    color: "#156651",
    fontSize: 16,
    fontWeight: "600",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 40,
    width: "100%",
  },
  firstSlideButtonContainer: {
    justifyContent: "center", // Centers the single button on first slide
  },
  button: {
    height: 43,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidthButton: {
    width: "90%", // Taking almost full width on first slide
  },
  sixtyWidthButton: {
    width: "60%", // 60% width for other slides
  },
});

export default Onboarding;
