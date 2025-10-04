import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";

const MARCAS_KEY = "@marcas";

const MarcaFormScreen = () => {
  const [nome, setNome] = useState("");
  const [ativo, setAtivo] = useState(true);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!nome.trim()) {
      alert("Por favor, preencha o nome da marca");
      return;
    }

    const novaMarca = {
      id: Date.now().toString(),
      nome,
      ativo,
    };

    const dadosAtuais = await AsyncStorage.getItem(MARCAS_KEY);
    const marcas = dadosAtuais ? JSON.parse(dadosAtuais) : [];
    marcas.push(novaMarca);

    await AsyncStorage.setItem(MARCAS_KEY, JSON.stringify(marcas));

    alert("Marca cadastrada com sucesso!");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Input
        label="Nome da Marca"
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Nike, Adidas, etc"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Marca Ativa?</Text>
        <Switch value={ativo} onValueChange={setAtivo} />
      </View>

      <Button title="Salvar Marca" onPress={handleSubmit} color="#FF9800" />
    </View>
  );
};

export default MarcaFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});
