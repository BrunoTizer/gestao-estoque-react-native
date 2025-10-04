import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
};

const Button = ({ title, onPress, color = Colors.primary }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
