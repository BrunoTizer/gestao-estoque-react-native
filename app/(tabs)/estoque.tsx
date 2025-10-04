import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";

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
        <Card key={item.id}>
          <Text>{item.nomeProduto}</Text>
          <Text>Código: {item.codigoProduto}</Text>
        </Card>
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
});
