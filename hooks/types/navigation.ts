import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Homepage: undefined;
  MyCart: undefined;
  MyAccount: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
