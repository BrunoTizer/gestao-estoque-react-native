import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Colors } from "../constants/Colors";
import { postFornecedor } from "@/src/api/fornecedores";

const FornecedorFormScreen = () => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    try {
      const novoFornecedor = {
        nome,
        cnpj,
        telefone,
        email,
        ativo: true,
      };

      await postFornecedor(novoFornecedor);
      router.back();
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
      alert("Erro ao salvar fornecedor. Verifique se a API está rodando.");
    }
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
    backgroundColor: Colors.background,
  },
});
