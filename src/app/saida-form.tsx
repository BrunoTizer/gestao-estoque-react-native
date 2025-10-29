import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from 'zod';
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Colors } from "@/constants/Colors";
import { getProdutos } from "@/src/api/produtos";
import { postSaida } from "@/src/api/saidas";
import { Produto } from "@/src/types/produtos";

const saidaSchema = z.object({
  quantidade: z.string().min(1, 'Quantidade é obrigatória'),
});

const SaidaFormScreen = () => {
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    carregarProdutos();
    carregarRascunho();
  }, []);

  async function carregarProdutos() {
    const lista = await getProdutos();
    setProdutos(lista);
    if (lista.length > 0) {
      setProdutoId(lista[0].id);
    }
  }

  async function carregarRascunho() {
    try {
      const rascunho = await AsyncStorage.getItem("saida_rascunho");
      if (rascunho) {
        const dados = JSON.parse(rascunho);
        setProdutoId(dados.produtoId);
        setQuantidade(dados.quantidade);
      }
    } catch (error) {
      console.error("Erro ao carregar rascunho:", error);
    }
  }

  async function salvarRascunho(prodId: string, qtd: string) {
    try {
      const dados = {
        produtoId: prodId,
        quantidade: qtd,
      };
      await AsyncStorage.setItem("saida_rascunho", JSON.stringify(dados));
    } catch (error) {
      console.error("Erro ao salvar rascunho:", error);
    }
  }

  async function deletarRascunho() {
    try {
      await AsyncStorage.removeItem("saida_rascunho");
    } catch (error) {
      console.error("Erro ao deletar rascunho:", error);
    }
  }

  async function handleSubmit() {
    try {
      saidaSchema.parse({
        quantidade,
      });

      const novaSaida = {
        produto: {
          id: produtoId,
        },
        quantidade: parseInt(quantidade),
      };

      await postSaida(novaSaida);
      await deletarRascunho();
      router.back();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Erro de validação:", error.errors[0].message);
        alert(error.errors[0].message);
      } else {
        console.error("Erro ao salvar saída:", error);
        alert("Erro ao salvar saída. Verifique se a API está rodando.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.campo}>
        <Text style={styles.label}>Produto</Text>
        <Picker selectedValue={produtoId} onValueChange={setProdutoId}>
          {produtos.map((item) => (
            <Picker.Item
              key={item.id}
              label={item.nomeProduto}
              value={item.id}
            />
          ))}
        </Picker>
      </View>

      <Input
        label="Quantidade"
        value={quantidade}
        onChangeText={(qtd) => {
          setQuantidade(qtd);
          salvarRascunho(produtoId, qtd);
        }}
        placeholder="Ex: 10"
        keyboardType="numeric"
      />

      <Button title="Registrar Saída" onPress={handleSubmit} />
    </View>
  );
};

export default SaidaFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  campo: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
