import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";

const PRODUTOS_KEY = "@produtos";

const ProdutoFormScreen = () => {
  const router = useRouter();
  const [codigoProduto, setCodigoProduto] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");

  async function handleSubmit() {
    const novoProduto = {
      id: Date.now().toString(),
      codigoProduto,
      nomeProduto,
      ativo: true,
    };

    const dados = await AsyncStorage.getItem(PRODUTOS_KEY);
    const produtos = dados ? JSON.parse(dados) : [];
    produtos.push(novoProduto);
    await AsyncStorage.setItem(PRODUTOS_KEY, JSON.stringify(produtos));

    router.back();
  }

  return (
    <View style={styles.container}>
      <Input
        label="Código do Produto"
        value={codigoProduto}
        onChangeText={setCodigoProduto}
        placeholder="Ex: PROD001"
      />

      <Input
        label="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
        placeholder="Nome do produto"
      />

      <Button title="Salvar Produto" onPress={handleSubmit} color="#2196F3" />
    </View>
  );
};

export default ProdutoFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});
