import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const PRODUTOS_KEY = "@produtos";

const EstoqueScreen = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function loadData() {
      const dados = await AsyncStorage.getItem(PRODUTOS_KEY);
      const lista = dados ? JSON.parse(dados) : [];
      setProdutos(lista);
    }
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque Atual</Text>

      {produtos.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text>{item.nomeProduto}</Text>
          <Text>Código: {item.codigoProduto}</Text>
        </View>
      ))}
    </View>
  );
};

export default EstoqueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});
