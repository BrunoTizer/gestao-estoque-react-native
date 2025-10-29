import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from 'zod';
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Colors } from "@/constants/Colors";
import { postFornecedor } from "@/src/api/fornecedores";

const fornecedorSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cnpj: z.string().min(10, 'CNPJ inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
});

const FornecedorFormScreen = () => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    carregarRascunho();
  }, []);

  async function carregarRascunho() {
    try {
      const rascunho = await AsyncStorage.getItem("fornecedor_rascunho");
      if (rascunho) {
        const dados = JSON.parse(rascunho);
        setNome(dados.nome);
        setCnpj(dados.cnpj);
        setTelefone(dados.telefone);
        setEmail(dados.email);
      }
    } catch (error) {
      console.error("Erro ao carregar rascunho:", error);
    }
  }

  async function salvarRascunho() {
    try {
      const dados = {
        nome,
        cnpj,
        telefone,
        email,
      };
      await AsyncStorage.setItem("fornecedor_rascunho", JSON.stringify(dados));
    } catch (error) {
      console.error("Erro ao salvar rascunho:", error);
    }
  }

  async function deletarRascunho() {
    try {
      await AsyncStorage.removeItem("fornecedor_rascunho");
    } catch (error) {
      console.error("Erro ao deletar rascunho:", error);
    }
  }

  async function handleSubmit() {
    try {
      fornecedorSchema.parse({
        nome,
        cnpj,
        telefone,
        email,
      });

      const novoFornecedor = {
        nome,
        cnpj,
        telefone,
        email,
        ativo: true,
      };

      await postFornecedor(novoFornecedor);
      await deletarRascunho();
      router.back();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Erro de validação:", error.errors[0].message);
        alert(error.errors[0].message);
      } else {
        console.error("Erro ao salvar fornecedor:", error);
        alert("Erro ao salvar fornecedor. Verifique se a API está rodando.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <Input
        label="Nome"
        value={nome}
        onChangeText={(valor) => {
          setNome(valor);
          salvarRascunho();
        }}
        placeholder="Nome do fornecedor"
      />

      <Input
        label="CNPJ"
        value={cnpj}
        onChangeText={(valor) => {
          setCnpj(valor);
          salvarRascunho();
        }}
        placeholder="00.000.000/0000-00"
        keyboardType="numeric"
      />

      <Input
        label="Telefone"
        value={telefone}
        onChangeText={(valor) => {
          setTelefone(valor);
          salvarRascunho();
        }}
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
      />

      <Input
        label="Email"
        value={email}
        onChangeText={(valor) => {
          setEmail(valor);
          salvarRascunho();
        }}
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
