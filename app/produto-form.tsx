import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
      <Text style={styles.label}>Código do Produto</Text>
      <TextInput
        style={styles.input}
        value={codigoProduto}
        onChangeText={setCodigoProduto}
        placeholder="Ex: PROD001"
      />

      <Text style={styles.label}>Nome do Produto</Text>
      <TextInput
        style={styles.input}
        value={nomeProduto}
        onChangeText={setNomeProduto}
        placeholder="Nome do produto"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar Produto</Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
