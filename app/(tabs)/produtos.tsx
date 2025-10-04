import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";

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
        <Card key={item.id}>
          <Text>{item.nomeProduto}</Text>
          <Text>{item.codigoProduto}</Text>
        </Card>
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
});
