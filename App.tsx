import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./screens/WelcomeScreen";
import ChildModeScreen from "./screens/ChildModeScreen";
import ParentModeScreen from "./screens/ParentModeScreen";

const Stack = createStackNavigator();

export default function App() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      const storedRole = await AsyncStorage.getItem("userRole");
      setUserRole(storedRole);
    };
    checkRole();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userRole === null ? (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        ) : userRole === "child" ? (
          <Stack.Screen name="ChildMode" component={ChildModeScreen} />
        ) : (
          <Stack.Screen name="ParentMode" component={ParentModeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
