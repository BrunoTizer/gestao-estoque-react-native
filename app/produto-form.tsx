import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Colors } from "../constants/Colors";
import { postProduto } from "@/src/api/produtos";
import { getFornecedores } from "@/src/api/fornecedores";
import { getMarcas } from "@/src/api/marcas";

const ProdutoFormScreen = () => {
  const router = useRouter();
  const [codigoProduto, setCodigoProduto] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidadeAtual, setQuantidadeAtual] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");
  const [marcaId, setMarcaId] = useState("");
  const [fornecedores, setFornecedores] = useState([]);
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    carregarFornecedores();
    carregarMarcas();
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

  async function handleSubmit() {
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

      <Input
        label="Quantidade Inicial"
        value={quantidadeAtual}
        onChangeText={setQuantidadeAtual}
        placeholder="Ex: 100"
        keyboardType="numeric"
      />

      <View style={styles.campo}>
        <Text style={styles.label}>Fornecedor</Text>
        <Picker selectedValue={fornecedorId} onValueChange={setFornecedorId}>
          {fornecedores.map((item) => (
            <Picker.Item key={item.id} label={item.nome} value={item.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Marca</Text>
        <Picker selectedValue={marcaId} onValueChange={setMarcaId}>
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
