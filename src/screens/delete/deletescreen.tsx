import ModalScreen from "@/src/cp/ModalScreen";
import { ThemedView } from "@/src/cp/ThemedView";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from 'react-native';
import { TProdutoAttr } from "@/src/model/produto";
import { Button } from "@/src/cp/Button";
import { useContextProduto, ProdutoActionTypes } from "@/src/state/produto";
import { DZSQLiteDelete, DZSQLiteUpdate } from "@/src/db/drizzlesqlite";
import { ThemedText } from "@/src/cp/ThemedText";

type DeleteProps = {
  visible: boolean,
  handleClose: () => void,
  produto: TProdutoAttr | null,
}

export function DeleteScreen({ visible, handleClose, produto }: DeleteProps) {
  const { dispatch } = useContextProduto();

  const [deletingProduto, setDeletingProduto] = useState<TProdutoAttr | null>(produto);

  useEffect(() => {
    setDeletingProduto(produto);
  }, [produto]); // Atualiza o estado quando o produto muda

  const handleDelete = () => {
    if (!deletingProduto) return;

    dispatch({ type: ProdutoActionTypes.DELETE_PRODUTO, payload: deletingProduto });
    DZSQLiteDelete(deletingProduto.id); // Deleta do banco de dados
    handleClose();
  };

  return (
    <ModalScreen isVisible={visible} onClose={handleClose} title="Confirmação de Deleção">
      <ThemedView style={styles.container}>
        <ThemedText type="defaultCenter">{deletingProduto ? `Tem certeza que deseja deletar o produto ${deletingProduto.name}?` : "Nenhum produto selecionado."}</ThemedText>
        <ThemedView style={styles.container}>
          <Button label="Sim" theme="primary"  onPress={handleDelete}/>
        </ThemedView>
        <ThemedView style={styles.container}>
          <Button label="Não" theme="primary" onPress={handleClose} />
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
