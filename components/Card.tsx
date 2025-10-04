import { StyleSheet, View } from "react-native";

type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});
