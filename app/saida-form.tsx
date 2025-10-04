import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";

const PRODUTOS_KEY = "@produtos";
const SAIDAS_KEY = "@saidas";

const SaidaFormScreen = () => {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    async function loadProdutos() {
      const dados = await AsyncStorage.getItem(PRODUTOS_KEY);
      const lista = dados ? JSON.parse(dados) : [];
      setProdutos(lista);
    }
    loadProdutos();
  }, []);

  const handleSubmit = async () => {
    if (!produtoSelecionado) {
      alert("Selecione um produto");
      return;
    }

    const qtd = parseInt(quantidade);
    if (!qtd || qtd <= 0) {
      alert("Quantidade inválida");
      return;
    }

    const produto = produtos.find((p) => p.id === produtoSelecionado);

    if (produto.quantidadeAtual < qtd) {
      alert("Quantidade insuficiente no estoque!");
      return;
    }

    const novosProdutos = produtos.map((p) => {
      if (p.id === produtoSelecionado) {
        return {
          ...p,
          quantidadeAtual: p.quantidadeAtual - qtd,
          dataUltimaAtualizacao: new Date().toISOString(),
        };
      }
      return p;
    });

    await AsyncStorage.setItem(PRODUTOS_KEY, JSON.stringify(novosProdutos));

    const novaSaida = {
      id: Date.now().toString(),
      produtoId: produtoSelecionado,
      nomeProduto: produto.nomeProduto,
      quantidade: qtd,
      dataSaida: new Date().toISOString(),
    };

    const dadosSaidas = await AsyncStorage.getItem(SAIDAS_KEY);
    const saidas = dadosSaidas ? JSON.parse(dadosSaidas) : [];
    saidas.push(novaSaida);
    await AsyncStorage.setItem(SAIDAS_KEY, JSON.stringify(saidas));

    alert("Saída registrada com sucesso!");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Produto</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={produtoSelecionado}
          onValueChange={setProdutoSelecionado}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um produto" value="" />
          {produtos.map((produto) => (
            <Picker.Item
              key={produto.id}
              label={`${produto.nomeProduto} (Estoque: ${produto.quantidadeAtual || 0})`}
              value={produto.id}
            />
          ))}
        </Picker>
      </View>

      <Input
        label="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Quantidade a retirar"
        keyboardType="numeric"
      />

      <Button title="Registrar Saída" onPress={handleSubmit} color="#f44336" />
    </View>
  );
};

export default SaidaFormScreen;

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
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
});
