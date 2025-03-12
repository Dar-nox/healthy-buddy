import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@rneui/themed";

export default function ChildHomeScreen() {
  const [childData, setChildData] = useState({ name: "Player", level: 1, coins: 106 });

  useEffect(() => {
    const loadData = async () => {
      const storedData = await AsyncStorage.getItem("childProfile");
      if (storedData) {
        setChildData(JSON.parse(storedData));
      } else {
        await AsyncStorage.setItem("childProfile", JSON.stringify(childData));
      }
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Healthy Buddy</Text>
        <View style={styles.coinsContainer}>
          <Image source={require("../assets/coin.png")} style={styles.coinIcon} />
          <Text style={styles.coinText}>{childData.coins}</Text>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require("../assets/avatar.png")} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{childData.name}</Text>
          <Text style={styles.stats}>Level: {childData.level}</Text>
        </View>
      </View>

      {/* Pinboard Styled Quests Section */}
      <View style={styles.pinboard}>
        <View style={styles.pin} />  
        <Text style={styles.sectionTitle}>Current Quests</Text>
        <ScrollView style={styles.quests}>
          <Card containerStyle={styles.questCard}>
            <Text>🥦 Eat 2 servings of vegetables</Text>
            <Text style={styles.questReward}>Reward: 50 XP, 10 Coins</Text>
          </Card>
          <Card containerStyle={styles.questCard}>
            <Text>🚰 Drink 5 glasses of water</Text>
            <Text style={styles.questReward}>Reward: 30 XP, 5 Coins</Text>
          </Card>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFE2DF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#535271",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  coinsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 10,
  },
  coinIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  coinText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  stats: {
    fontSize: 16,
    color: "gray",
  },

  /* Pinboard Styles */
  pinboard: {
    backgroundColor: "#F8D49D",  // Pinboard-like background
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    borderWidth: 3,
    borderColor: "#C87E4F",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  pin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#D32F2F",  // Red pushpin
    position: "absolute",
    top: -10,
    left: "50%",
    transform: [{ translateX: -10 }],
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#633939",
  },
  quests: {
    marginTop: 5,
  },
  questCard: {
    backgroundColor: "#ffffff",  // Light brown for sticky notes
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#9E673C",
    padding: 10,
    marginBottom: 10,
  },
  questReward: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
});

export default ChildHomeScreen;
