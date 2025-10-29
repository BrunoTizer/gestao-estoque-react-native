import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "@/src/components/Card";
import { Colors } from "@/constants/Colors";
import { getProdutos } from "@/src/api/produtos";
import { Produto } from "@/src/types/produtos";

const EstoqueScreen = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const loadData = async () => {
    const lista = await getProdutos();
    setProdutos(lista);
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatData = (dataISO: string | null | undefined) => {
    if (!dataISO) return "N/A";
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque Atual</Text>

      <TouchableOpacity style={styles.refreshButton} onPress={loadData}>
        <Text style={styles.refreshText}>🔄 Atualizar</Text>
      </TouchableOpacity>

      {produtos.map((item) => (
        <Card key={item.id}>
          <Text style={styles.nomeProduto}>{item.nomeProduto}</Text>
          <Text style={styles.codigo}>Código: {item.codigoProduto}</Text>
          <Text style={styles.quantidade}>
            Quantidade: {item.quantidadeAtual || 0} unidades
          </Text>
          <Text style={styles.data}>
            Última atualização: {formatData(item.dataUltimaAtualizacao)}
          </Text>
        </Card>
      ))}
    </View>
  );
};

export default EstoqueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.textPrimary,
  },
  refreshButton: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  refreshText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 16,
  },
  nomeProduto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.textPrimary,
  },
  codigo: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  quantidade: {
    fontSize: 16,
    color: Colors.success,
    fontWeight: "600",
    marginBottom: 5,
  },
  data: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
