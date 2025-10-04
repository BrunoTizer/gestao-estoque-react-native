import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";

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
      <Input
        label="Nome"
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do fornecedor"
      />

      <Input
        label="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
        placeholder="00.000.000/0000-00"
        keyboardType="numeric"
      />

      <Input
        label="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
      />

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="email@exemplo.com"
        keyboardType="email-address"
      />

      <Button title="Salvar Fornecedor" onPress={handleSubmit} />
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
});
