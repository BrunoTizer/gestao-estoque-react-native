import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { Colors } from "../constants/Colors";

type InputProps = TextInputProps & {
  label: string;
};

const Input = ({ label, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: Colors.textPrimary,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});
