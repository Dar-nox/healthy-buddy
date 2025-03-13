import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen({ setUserRole }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"child" | "parent" | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const selectRole = (role: "child" | "parent") => {
    setSelectedRole(role);
    setModalVisible(true);
  };

  const handleLogin = () => {
    if (username === "test" && password === "123") {
      setUserRole(selectedRole);
      navigation.reset({
        index: 0,
        routes: [{ name: selectedRole === "child" ? "ChildMode" : "ParentMode" }],
      });
      setModalVisible(false);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
      </View>
      <Text style={styles.title}></Text>
      <Text style={styles.subtitle}>Are you a Child or a Parent?</Text>
      <TouchableOpacity style={styles.button} onPress={() => selectRole("child")}>
        <Text style={styles.buttonText}>Child</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => selectRole("parent")}>
        <Text style={styles.buttonText}>Parent</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFE2DF",
    padding: 20,
  },
  logoContainer: {
    backgroundColor: "#5D884C",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2A4420",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFE2DF",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#2F6229",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#B61616",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});