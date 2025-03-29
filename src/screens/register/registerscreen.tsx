import ModalScreen from "@/src/cp/ModalScreen";
import { ThemedView } from "@/src/cp/ThemedView";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Produto } from "@/src/model/produto";
import { Button } from "@/src/cp/Button";
import { useContextProduto, ProdutoActionTypes } from "@/src/state/produto";
import { DZSQLiteInsert } from "@/src/db/drizzlesqlite";
import { produtosTable } from "@/src/db/schema";

type RegisterProps = {
  visible: boolean,
  handleClose: () => void,
}

export function RegisterScreen({ visible, handleClose }: RegisterProps) {
  const { dispatch } = useContextProduto()
  
  const [ID, setID] = useState("")
  const [name, setName] = useState("")
  const [preco, setPreco] = useState("")
  
  
  const handleClick = () => {
    const precoFinal = preco ? parseFloat(preco) : 0; // Converte somente se houver valor
    const newProduto = new Produto(precoFinal, name);
    DZSQLiteInsert(produtosTable, newProduto.data)
    setID(newProduto.id)
    dispatch({ type: ProdutoActionTypes.ADD_PRODUTO, payload: newProduto.datacpy });

    handleClose()
  }
  
  useEffect(() => {
    if (visible) {
      setName("");
      setPreco("");
    }
  }, [visible]);

  return (
    <ModalScreen isVisible={visible} onClose={handleClose} title="Registro de Produto">
      <ThemedView style={styles.container}>
        <View style={styles.input}>
          <TextInput value={name}
            placeholder="Informe nome do produto: "
            autoCapitalize="none"
            autoCorrect={false}

            onChangeText={(text) => setName(text)} />
        </View>

        <View style={styles.input}>
          <TextInput value={(preco)}
            placeholder="Informe preço do produto: "
            keyboardType="decimal-pad"
            autoCorrect={false}

            onChangeText={(text) => setPreco(text)} />
        </View>
        <ThemedView style={styles.footer}>
          <Button label="Registrar" iconame='save' theme="primary" onPress= {handleClick} />
        </ThemedView>
      </ThemedView>
    </ModalScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: 'flex-start',
    padding: 10,
    gap: 8,
  },
  footer: {
    alignSelf: 'center',
  },
  input: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    marginBottom: 6,
    padding: 6,
    width: "100%",
  },
  id: {
    color: "grey",
    margin: 10,
  },
});