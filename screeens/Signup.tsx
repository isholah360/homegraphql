import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
  
    setLoading(true);
    setErrorMessage("");
  
    const graphqlEndpoint = "https://jsonplaceholder.ir/graphql"; 
    const mutation = `
      query {
        users {
          firstName
          lastName
          email
          password
        }
      }
    `;
  
    try {
      const response = await fetch(graphqlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });
  
      const { data, errors } = await response.json();
  
      if (errors) {
        setErrorMessage("An error occurred. Please try again.");
        console.error(errors);
      } else {
        const users = data?.users;
  
      
        const user = users?.find(
          (u: { email: string; password: string }) =>
            u.email === email && u.password === password
        );
  
        if (!user) {
          setErrorMessage("Invalid credentials. Please check your email and password.");
        } else {
        
          await AsyncStorage.setItem("authToken", JSON.stringify(user.id)); 
          await AsyncStorage.setItem("user", JSON.stringify(user)); 
  
          // Navigate to homepage
          navigation.navigate("Homepage");
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleCreateAccount = () => {
    // Implement your registration logic here
    console.log("Registration attempted with:", formData);
  };

  const handleGoogleSignup = () => {
    // Implement Google signup
    console.log("Google signup attempted");
  };

  const handleFacebookSignup = () => {
    // Implement Facebook signup
    console.log("Facebook signup attempted");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f5f5f5" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Fill in your details below to get started on a seamless shopping
            experience.
          </Text>

          <View style={styles.form}>
            {/* First Name Input */}
            <View style={styles.inputContainer}>
              <Feather
                name="user"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 8,
                  left: 40,
                  fontSize: 12,
                  color: "#404040",
                }}
              >
                First Name
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Claire"
                placeholderTextColor="#999"
                value={formData.firstName}
                onChangeText={(text) =>
                  setFormData({ ...formData, firstName: text })
                }
              />
            </View>

            {/* Last Name Input */}
            <View style={styles.inputContainer}>
              <Feather
                name="user"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 8,
                  left: 40,
                  fontSize: 12,
                  color: "#404040",
                }}
              >
                Last Name
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Cooper"
                placeholderTextColor="#999"
                value={formData.lastName}
                onChangeText={(text) =>
                  setFormData({ ...formData, lastName: text })
                }
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 8,
                  left: 40,
                  fontSize: 12,
                  color: "#404040",
                }}
              >
                Email
              </Text>
              <TextInput
                style={styles.input}
                placeholder="claire.cooper@mail.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 8,
                  left: 40,
                  fontSize: 12,
                  color: "#404040",
                }}
              >
                Password
              </Text>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="*********"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Entypo
                  name={showPassword ? "eye-with-line" : "eye"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Terms and Privacy Policy */}
            <Text style={styles.termsText}>
              By clicking Create Account, you acknowledge you have read and
              agreed to our <Text style={styles.linkText}>Terms of Use</Text>{" "}
              and <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>

            {/* Create Account Button */}
            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={handleCreateAccount}
            >
              <Text style={styles.createAccountButtonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Signup Buttons */}
            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton]}
              onPress={handleGoogleSignup}
            >
              <Image
                source={require("../assets/images/google.png")}
                style={{ height: 16, width: 16, marginVertical: 22 }}
                resizeMode="cover"
              />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
              onPress={handleFacebookSignup}
            >
              <FontAwesome name="facebook" size={24} color="#4267B2" />
              <Text style={styles.socialButtonText}>
                Continue with Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#404040",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 32,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: "#ffffff",
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
    marginTop: 15,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    padding: 4,
  },
  termsText: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 24,
    lineHeight: 18,
  },
  linkText: {
    color: "#156651",
    textDecorationLine: "underline",
  },
  createAccountButton: {
    backgroundColor: "#156651",
    borderRadius: 8,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  createAccountButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E8E8E8",
  },
  dividerText: {
    color: "#999",
    paddingHorizontal: 16,
    fontSize: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 43,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  socialButtonText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
  },
  facebookButton: {
    backgroundColor: "#FFFFFF",
  },
});

export default Signup;
