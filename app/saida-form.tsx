import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Colors } from "../constants/Colors";
import { getProdutos } from "@/src/api/produtos";
import { postSaida } from "@/src/api/saidas";

const SaidaFormScreen = () => {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const lista = await getProdutos();
    setProdutos(lista);
    if (lista.length > 0) {
      setProdutoId(lista[0].id);
    }
  }

  async function handleSubmit() {
    const novaSaida = {
      produto: {
        id: produtoId,
      },
      quantidade: parseInt(quantidade),
    };

    await postSaida(novaSaida);
    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={styles.campo}>
        <Text style={styles.label}>Produto</Text>
        <Picker selectedValue={produtoId} onValueChange={setProdutoId}>
          {produtos.map((item) => (
            <Picker.Item key={item.id} label={item.nomeProduto} value={item.id} />
          ))}
        </Picker>
      </View>

      <Input
        label="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
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
