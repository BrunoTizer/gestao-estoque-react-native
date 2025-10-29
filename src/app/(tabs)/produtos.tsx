import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "@/src/components/Card";
import { Colors } from "@/constants/Colors";
import { getProdutos } from "@/src/api/produtos";
import { Produto } from "@/src/types/produtos";

const ProdutosScreen = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const loadData = async () => {
    try {
      const lista = await getProdutos();
      setProdutos(lista);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Link href="/produto-form" style={styles.link}>
        + Novo Produto
      </Link>

      <TouchableOpacity style={styles.refreshButton} onPress={loadData}>
        <Text style={styles.refreshText}>🔄 Atualizar</Text>
      </TouchableOpacity>

      {produtos.map((item) => (
        <Card key={item.id}>
          <Text>{item.nomeProduto}</Text>
          <Text>{item.codigoProduto}</Text>
        </Card>
      ))}
    </View>
  );
};

export default ProdutosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  link: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 15,
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 10,
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
});
