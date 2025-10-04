import { Link, Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Sistema de Gestão de Estoque</Text>
      <Link replace href={"/(tabs)/fornecedores"} style={styles.link}>
        Entrar no Sistema
      </Link>
    </SafeAreaView>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CAF50",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  link: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
  },
});
