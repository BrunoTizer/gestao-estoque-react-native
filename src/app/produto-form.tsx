import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from 'zod';
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Colors } from "@/constants/Colors";
import { postProduto } from "@/src/api/produtos";
import { getFornecedores } from "@/src/api/fornecedores";
import { getMarcas } from "@/src/api/marcas";
import { Fornecedor } from "@/src/types/fornecedores";
import { Marca } from "@/src/types/marcas";

const produtoSchema = z.object({
  codigoProduto: z.string().min(1, 'Código é obrigatório'),
  nomeProduto: z.string().min(1, 'Nome é obrigatório'),
  quantidadeAtual: z.string().min(1, 'Quantidade é obrigatória'),
});

const ProdutoFormScreen = () => {
  const router = useRouter();
  const [codigoProduto, setCodigoProduto] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidadeAtual, setQuantidadeAtual] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");
  const [marcaId, setMarcaId] = useState("");
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);

  useEffect(() => {
    carregarFornecedores();
    carregarMarcas();
    carregarRascunho();
  }, []);

  async function carregarFornecedores() {
    const lista = await getFornecedores();
    setFornecedores(lista);
    if (lista.length > 0) {
      setFornecedorId(lista[0].id);
    }
  }

  async function carregarMarcas() {
    const lista = await getMarcas();
    setMarcas(lista);
    if (lista.length > 0) {
      setMarcaId(lista[0].id);
    }
  }

  async function carregarRascunho() {
    try {
      const rascunho = await AsyncStorage.getItem("produto_rascunho");
      if (rascunho) {
        const dados = JSON.parse(rascunho);
        setCodigoProduto(dados.codigoProduto);
        setNomeProduto(dados.nomeProduto);
        setQuantidadeAtual(dados.quantidadeAtual);
        setFornecedorId(dados.fornecedorId);
        setMarcaId(dados.marcaId);
      }
    } catch (error) {
      console.error("Erro ao carregar rascunho:", error);
    }
  }

  async function salvarRascunho() {
    try {
      const dados = {
        codigoProduto,
        nomeProduto,
        quantidadeAtual,
        fornecedorId,
        marcaId,
      };
      await AsyncStorage.setItem("produto_rascunho", JSON.stringify(dados));
    } catch (error) {
      console.error("Erro ao salvar rascunho:", error);
    }
  }

  async function deletarRascunho() {
    try {
      await AsyncStorage.removeItem("produto_rascunho");
    } catch (error) {
      console.error("Erro ao deletar rascunho:", error);
    }
  }

  async function handleSubmit() {
    try {
      produtoSchema.parse({
        codigoProduto,
        nomeProduto,
        quantidadeAtual,
      });

      const novoProduto = {
        codigoProduto: codigoProduto,
        nomeProduto: nomeProduto,
        fornecedor: {
          id: fornecedorId,
        },
        marca: {
          id: marcaId,
        },
        quantidadeAtual: parseInt(quantidadeAtual),
        ativo: true,
      };

      await postProduto(novoProduto);
      await deletarRascunho();
      router.back();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Erro de validação:", error.errors[0].message);
        alert(error.errors[0].message);
      } else {
        console.error("Erro ao salvar produto:", error);
        alert("Erro ao salvar produto. Verifique se a API está rodando.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <Input
        label="Código do Produto"
        value={codigoProduto}
        onChangeText={(valor) => {
          setCodigoProduto(valor);
          salvarRascunho();
        }}
        placeholder="Ex: PROD001"
      />

      <Input
        label="Nome do Produto"
        value={nomeProduto}
        onChangeText={(valor) => {
          setNomeProduto(valor);
          salvarRascunho();
        }}
        placeholder="Nome do produto"
      />

      <Input
        label="Quantidade Inicial"
        value={quantidadeAtual}
        onChangeText={(valor) => {
          setQuantidadeAtual(valor);
          salvarRascunho();
        }}
        placeholder="Ex: 100"
        keyboardType="numeric"
      />

      <View style={styles.campo}>
        <Text style={styles.label}>Fornecedor</Text>
        <Picker
          selectedValue={fornecedorId}
          onValueChange={(valor) => {
            setFornecedorId(valor);
            salvarRascunho();
          }}
        >
          {fornecedores.map((item) => (
            <Picker.Item key={item.id} label={item.nome} value={item.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Marca</Text>
        <Picker
          selectedValue={marcaId}
          onValueChange={(valor) => {
            setMarcaId(valor);
            salvarRascunho();
          }}
        >
          {marcas.map((item) => (
            <Picker.Item key={item.id} label={item.nome} value={item.id} />
          ))}
        </Picker>
      </View>

      <Button title="Salvar Produto" onPress={handleSubmit} />
    </View>
  );
};

export default ProdutoFormScreen;

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
