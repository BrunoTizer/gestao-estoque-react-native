import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../../components/Card";

const MARCAS_KEY = "@marcas";

const MarcasScreen = () => {
  const [marcas, setMarcas] = useState([]);

  const loadData = async () => {
    const dados = await AsyncStorage.getItem(MARCAS_KEY);
    const lista = dados ? JSON.parse(dados) : [];
    setMarcas(lista);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Link href="/marca-form" style={styles.link}>
        + Nova Marca
      </Link>

      <TouchableOpacity style={styles.refreshButton} onPress={loadData}>
        <Text style={styles.refreshText}>🔄 Atualizar</Text>
      </TouchableOpacity>

      {marcas.map((item) => (
        <Card key={item.id}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.status}>
            Status: {item.ativo ? "✅ Ativo" : "❌ Inativo"}
          </Text>
        </Card>
      ))}
    </View>
  );
};

export default MarcasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  link: {
    backgroundColor: "#FF9800",
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
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: "#666",
  },
});
