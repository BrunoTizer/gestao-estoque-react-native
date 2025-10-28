import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Colors } from "../constants/Colors";
import { postMarca } from "@/src/api/marcas";

const MarcaFormScreen = () => {
  const [nome, setNome] = useState("");
  const [ativo, setAtivo] = useState(true);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!nome.trim()) {
      alert("Por favor, preencha o nome da marca");
      return;
    }

    try {
      const novaMarca = {
        nome,
        ativo,
      };

      await postMarca(novaMarca);
      alert("Marca cadastrada com sucesso!");
      router.back();
    } catch (error) {
      console.error("Erro ao salvar marca:", error);
      alert("Erro ao salvar marca. Verifique se a API está rodando.");
    }
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

      <Button title="Salvar Marca" onPress={handleSubmit} />
    </View>
  );
};

export default MarcaFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
});
