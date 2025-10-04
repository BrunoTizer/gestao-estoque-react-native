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

const FORNECEDORES_KEY = "@fornecedores";

const FornecedorFormScreen = () => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    const novoFornecedor = {
      id: Date.now().toString(),
      nome,
      cnpj,
      telefone,
      email,
      ativo: true,
    };

    const dados = await AsyncStorage.getItem(FORNECEDORES_KEY);
    const fornecedores = dados ? JSON.parse(dados) : [];
    fornecedores.push(novoFornecedor);
    await AsyncStorage.setItem(FORNECEDORES_KEY, JSON.stringify(fornecedores));

    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do fornecedor"
      />

      <Text style={styles.label}>CNPJ</Text>
      <TextInput
        style={styles.input}
        value={cnpj}
        onChangeText={setCnpj}
        placeholder="00.000.000/0000-00"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="email@exemplo.com"
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar Fornecedor</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FornecedorFormScreen;

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
    backgroundColor: "#4CAF50",
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
