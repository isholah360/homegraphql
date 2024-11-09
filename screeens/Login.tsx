import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Login: undefined;
  Homepage: undefined;
  Signup: undefined;
  // Add other screens here as needed
};

// Define navigation prop type
type NavigationProps = NavigationProp<RootStackParamList>;

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation<NavigationProps>();

  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
  
    setLoading(true);
    setErrorMessage("");
  
    const graphqlEndpoint = "https://jsonplaceholder.ir/graphql"; 
    const query = `
      query {
        users {
          id
          username
          email
          password
          website
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

  
  const handleGoogleLogin = () => {
    console.log("Google login attempted");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login attempted");
  };

  const handleRegister = () => {
    navigation.navigate("Signup"); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f5f5f5" />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Enter your email to start shopping and get awesome deals today!
        </Text>

        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="rifqi.naufal@mail.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
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

          {/* Error Message */}
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? "Logging in..." : "Log in"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Login Buttons */}
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleGoogleLogin}
          >
            <Image
              source={require("../assets/images/google.png")}
              style={{ height: 16, width: 16, marginVertical: 22 }}
              resizeMode="cover"
            />
            <Text style={styles.socialButtonText}>Log in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, styles.facebookButton]}
            onPress={handleFacebookLogin}
          >
            <FontAwesome name="facebook" size={24} color="#4267B2" />
            <Text style={styles.socialButtonText}>Log in with Facebook</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5f5f5" },
  content: { flex: 1, padding: 24 },
  title: { fontSize: 32, fontWeight: "800", color: "#404040", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#757575", marginBottom: 32 },
  form: { width: "100%" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 53,
    backgroundColor: "#ffffff",
  },
  inputIcon: { marginRight: 8 },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  passwordInput: { paddingRight: 40 },
  eyeIcon: { padding: 4 },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: "#156651",
    borderRadius: 8,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
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
    color: "#156651",
    marginLeft: 12,
    fontWeight: "700",
  },
  googleButton: { backgroundColor: "#FFFFFF" },
  facebookButton: { backgroundColor: "#FFFFFF" },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    alignItems: "center",
  },
  registerText: { color: "#404040", fontSize: 16 },
  registerLink: { color: "#156651", fontSize: 14, fontWeight: "600" },
});

export default Login;
