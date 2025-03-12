import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const selectRole = async (role: "child" | "parent") => {
    await AsyncStorage.setItem("userRole", role);
    navigation.reset({
      index: 0,
      routes: [{ name: role === "child" ? "ChildMode" : "ParentMode" }], // Ensure these match App.tsx
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you a Child or a Parent?</Text>
      <TouchableOpacity style={styles.button} onPress={() => selectRole("child")}>
        <Text style={styles.buttonText}>Child</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => selectRole("parent")}>
        <Text style={styles.buttonText}>Parent</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});