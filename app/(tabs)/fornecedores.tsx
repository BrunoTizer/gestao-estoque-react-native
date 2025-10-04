import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../../components/Card";
import { Colors } from "../../constants/Colors";

const FORNECEDORES_KEY = "@fornecedores";

const FornecedoresScreen = () => {
  const [fornecedores, setFornecedores] = useState([]);

  const loadData = async () => {
    const dados = await AsyncStorage.getItem(FORNECEDORES_KEY);
    const lista = dados ? JSON.parse(dados) : [];
    setFornecedores(lista);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Link href="/fornecedor-form" style={styles.link}>
        + Novo Fornecedor
      </Link>

      <TouchableOpacity style={styles.refreshButton} onPress={loadData}>
        <Text style={styles.refreshText}>🔄 Atualizar</Text>
      </TouchableOpacity>

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
    backgroundColor: Colors.background,
  },
  link: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 15,
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  refreshText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 16,
  },
});
