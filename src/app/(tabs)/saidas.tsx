import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "@/src/components/Card";
import { Colors } from "@/constants/Colors";
import { getSaidas } from "@/src/api/saidas";
import { SaidaEstoque } from "@/src/types/saidas";

const SaidasScreen = () => {
  const [saidas, setSaidas] = useState<SaidaEstoque[]>([]);

  const loadData = async () => {
    const lista = await getSaidas();
    setSaidas(lista);
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatData = (dataISO: string | null | undefined) => {
    if (!dataISO) return "N/A";
    const data = new Date(dataISO);
    return (
      data.toLocaleDateString("pt-BR") + " " + data.toLocaleTimeString("pt-BR")
    );
  };

  return (
    <View style={styles.container}>
      <Link href="/saida-form" style={styles.link}>
        + Registrar Saída
      </Link>

      <TouchableOpacity style={styles.refreshButton} onPress={loadData}>
        <Text style={styles.refreshText}>🔄 Atualizar</Text>
      </TouchableOpacity>

      {saidas.map((item) => (
        <Card key={item.id}>
          <Text style={styles.produto}>{item.produto.nomeProduto}</Text>
          <Text style={styles.quantidade}>
            Quantidade: {item.quantidade} unidades
          </Text>
          <Text style={styles.data}>Data: {formatData(item.dataSaida)}</Text>
        </Card>
      ))}
    </View>
  );
};

export default SaidasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  link: {
    backgroundColor: Colors.danger,
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
  produto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.textPrimary,
  },
  quantidade: {
    fontSize: 16,
    color: Colors.danger,
    marginBottom: 5,
  },
  data: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
