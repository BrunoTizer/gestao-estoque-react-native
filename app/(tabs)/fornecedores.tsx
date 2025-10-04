import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";

const FORNECEDORES_KEY = "@fornecedores";

const FornecedoresScreen = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    async function loadData() {
      const dados = await AsyncStorage.getItem(FORNECEDORES_KEY);
      const lista = dados ? JSON.parse(dados) : [];
      setFornecedores(lista);
    }
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Link href="/fornecedor-form" style={styles.link}>
        + Novo Fornecedor
      </Link>

      {fornecedores.map((item) => (
        <Card key={item.id}>
          <Text>{item.nome}</Text>
          <Text>{item.cnpj}</Text>
        </Card>
      ))}
    </View>
  );
};

export default FornecedoresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  link: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 20,
  },
});
