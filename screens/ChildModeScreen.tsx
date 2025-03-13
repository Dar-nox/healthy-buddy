import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import ChildHomeScreen from "./ChildHomeScreen";
import ShopScreen from "./ShopScreen";
import FriendsScreen from "./FriendsScreen";
import LeaderboardScreen from "./LeaderboardScreen";
import SettingsScreen from "./SettingsScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

// Custom Button for Navigation Icons (Shop, Friends, Leaderboard, Settings)
function CustomTabButton({ children, onPress, isHome }: any) {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.buttonContainer}>
      <Animated.View style={[isHome ? styles.homeButton : styles.smallButton, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default function ChildModeScreen({ setUserRole }) {
  return (
    <Tab.Navigator
      initialRouteName="Home" // Set initial route to Home
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Shop") {
            iconName = "cart";
          } else if (route.name === "Friends") {
            iconName = "people";
          } else if (route.name === "Leaderboard") {
            iconName = "trophy";
          } else if (route.name === "Settings") {
            iconName = "settings";
          }
          return <Ionicons name={iconName as any} size={30} color={focused ? "#3498db" : "white"} />;
        },
        tabBarButton: (props) =>
          route.name === "Home" ? (
            <CustomTabButton {...props} isHome={true} />
          ) : (
            <CustomTabButton {...props} isHome={false} />
          ),
      })}
    >
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Home" component={ChildHomeScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Settings">
        {(props) => <SettingsScreen {...props} setUserRole={setUserRole} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: "#587579",
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonContainer: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  homeButton: {
    top: -10,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#B1C4B4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    borderWidth: 5,
    borderColor: "rgba(0, 0, 0, 0.25)",
  },
  smallButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#B1C4B4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 4,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
});
