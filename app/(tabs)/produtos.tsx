import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const PRODUTOS_KEY = "@produtos";

const ProdutosScreen = () => {
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
      <Link href="/produto-form" style={styles.link}>
        + Novo Produto
      </Link>

      {produtos.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text>{item.nomeProduto}</Text>
          <Text>{item.codigoProduto}</Text>
        </View>
      ))}
    </View>
  );
};

export default ProdutosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  link: {
    backgroundColor: "#2196F3",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});
