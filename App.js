import { StatusBar } from "expo-status-bar";
import { Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ForgotPass, HomeScreen, Login, Signup } from "./screens";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { auth } from "./firebase";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [User, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
  }, [User, loading]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
