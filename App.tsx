import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import ChildModeScreen from "./screens/ChildModeScreen";
import ParentModeScreen from "./screens/ParentModeScreen";
import SettingsScreen from "./screens/SettingsScreen"; // Ensure this import is present

const Stack = createStackNavigator();

export default function App() {
  const [userRole, setUserRole] = useState<string | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userRole === null ? (
          <Stack.Screen name="Welcome">
            {(props) => <WelcomeScreen {...props} setUserRole={setUserRole} />}
          </Stack.Screen>
        ) : userRole === "child" ? (
          <Stack.Screen name="ChildMode">
            {(props) => <ChildModeScreen {...props} setUserRole={setUserRole} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="ParentMode">
            {(props) => <ParentModeScreen {...props} setUserRole={setUserRole} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
