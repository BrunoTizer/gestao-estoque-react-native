import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="fornecedores"
        options={{
          tabBarIcon: () => <Ionicons name="people" size={24} />,
          headerTitle: "Fornecedores",
        }}
      />
      <Tabs.Screen
        name="produtos"
        options={{
          tabBarIcon: () => <Ionicons name="cube" size={24} />,
          headerTitle: "Produtos",
        }}
      />
      <Tabs.Screen
        name="marcas"
        options={{
          tabBarIcon: () => <Ionicons name="pricetag" size={24} />,
          headerTitle: "Marcas",
        }}
      />
      <Tabs.Screen
        name="estoque"
        options={{
          tabBarIcon: () => <Ionicons name="analytics" size={24} />,
          headerTitle: "Estoque",
        }}
      />
      <Tabs.Screen
        name="saidas"
        options={{
          tabBarIcon: () => <Ionicons name="arrow-down" size={24} />,
          headerTitle: "Saídas",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
