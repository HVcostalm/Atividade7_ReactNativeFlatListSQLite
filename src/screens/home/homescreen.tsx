import { Button } from "@/src/cp/Button";
import { ThemedView } from "@/src/cp/ThemedView";
import { StyleSheet } from 'react-native';
import { useState } from "react";
import RegisterScreen from "../register";
import ProdutoListScreen from "../produtolist";

export function HomeScreen() {
  
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState<boolean>(false);

  const onRegisterModalClose = () => {
    setIsRegisterModalVisible(false);
  };

  return (
    <ThemedView style={styles.container}>   

       <ThemedView style={styles.content}>
          <ProdutoListScreen />
       </ThemedView>

       <ThemedView style={styles.footerContainer}>
          <Button label="Produto" iconame="save" theme="primary" onPress={()=>setIsRegisterModalVisible(true)} />
       </ThemedView>

      <RegisterScreen visible={isRegisterModalVisible} handleClose={onRegisterModalClose} />

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  footerContainer: {
    height: 60,
    alignItems: 'center',
  },
});