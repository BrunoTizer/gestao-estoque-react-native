import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../../components/Card";

const SAIDAS_KEY = "@saidas";

const SaidasScreen = () => {
  const [saidas, setSaidas] = useState([]);

  const loadData = async () => {
    const dados = await AsyncStorage.getItem(SAIDAS_KEY);
    const lista = dados ? JSON.parse(dados) : [];
    setSaidas(lista);
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatData = (dataISO) => {
    if (!dataISO) return "N/A";
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR") + " " + data.toLocaleTimeString("pt-BR");
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
          <Text style={styles.produto}>{item.nomeProduto}</Text>
          <Text style={styles.quantidade}>Quantidade: {item.quantidade} unidades</Text>
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
  },
  link: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  refreshText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  produto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  quantidade: {
    fontSize: 16,
    color: "#f44336",
    marginBottom: 5,
  },
  data: {
    fontSize: 12,
    color: "#999",
  },
});
