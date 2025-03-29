import ModalScreen from "@/src/cp/ModalScreen";
import { ThemedView } from "@/src/cp/ThemedView";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from 'react-native';
import { TProdutoAttr } from "@/src/model/produto";
import { Button } from "@/src/cp/Button";
import { useContextProduto, ProdutoActionTypes } from "@/src/state/produto";
import { DZSQLiteUpdate } from "@/src/db/drizzlesqlite";

type AlterProps = {
  visible: boolean,
  handleClose: () => void,
  produto: TProdutoAttr | null,
}

export function AlterScreen({ visible, handleClose, produto }: AlterProps) {
  const { dispatch } = useContextProduto();

  // Estado inicial para edição do produto
  const [editingProduto, setEditingProduto] = useState<TProdutoAttr | null>(produto);
  const [editedName, setEditedName] = useState(produto?.name || "");
  const [editedPreco, setEditedPreco] = useState(produto?.preco.toString() || "");

  // Sempre que o produto mudar, atualiza o estado de edição
  useEffect(() => {
    if (produto) {
      setEditingProduto(produto);
      setEditedName(produto.name);
      setEditedPreco(produto.preco.toString());
    }
  }, [produto]);

  const handleClick = () => {
    if (editingProduto) {
      const updatedProduto = {
        ...editingProduto,
        name: editedName,
        preco: parseFloat(editedPreco),
      };

      DZSQLiteUpdate(updatedProduto.id, updatedProduto); // Atualizando no banco de dados
      dispatch({ type: ProdutoActionTypes.ALTER_PRODUTO, payload: updatedProduto });
      setEditingProduto(null);
      handleClose(); // Fechar o modal
    }
  }

  return (
    <ModalScreen isVisible={visible} onClose={handleClose} title="Alteração do Produto">
      <ThemedView style={styles.container}>
        <View style={styles.input}>
          <TextInput 
            value={editedName}
            placeholder="Informe nome do produto: "
            onChangeText={(text) => setEditedName(text)} 
          />
        </View>

        <View style={styles.input}>
          <TextInput 
            value={editedPreco}
            placeholder="Informe preço do produto: "
            keyboardType="decimal-pad"
            onChangeText={(text) => setEditedPreco(text)} 
          />
        </View>
        <ThemedView style={styles.footer}>
          <Button label="Alterar" iconame="save" theme="primary" onPress={handleClick} />
        </ThemedView>
      </ThemedView>
    </ModalScreen>
  );
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
