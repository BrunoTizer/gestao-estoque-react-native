import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "@/src/components/Card";
import { Colors } from "../../constants/Colors";
import { getMarcas } from "@/src/api/marcas";
import { Marca } from "@/src/types/marcas";

const MarcasScreen = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);

  const loadData = async () => {
    try {
      const lista = await getMarcas();
      setMarcas(lista);
    } catch (error) {
      console.error("Erro ao carregar marcas:", error);
    }
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
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.textPrimary,
  },
  status: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
