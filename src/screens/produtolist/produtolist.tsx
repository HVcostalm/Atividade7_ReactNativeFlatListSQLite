import { Button } from '@/src/cp/Button';
import { ThemedText } from '@/src/cp/ThemedText';
import { ThemedView } from '@/src/cp/ThemedView';
import { DZSQLiteDelete, DZSQLiteSelect } from '@/src/db/drizzlesqlite';
import { produtosTable } from '@/src/db/schema';
import { TProdutoAttr } from '@/src/model/produto';
import { useContextProduto, ProdutoActionTypes } from '@/src/state/produto';
import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import AlterScreen from '../alter';
import DeleteScreen from '../delete';

type ProdutoListProps = {
    produto: TProdutoAttr
}

export function ProdutoListScreen() {
    const { state, dispatch } = useContextProduto();
    const [isAlterModalVisible, setIsAlterModalVisible] = useState<boolean>(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [editingProduto, setEditingProduto] = useState<TProdutoAttr | null>(null);
    const [deletingProduto, setDeletingProduto] = useState<TProdutoAttr | null>(null);

    const onAlterModalClose = () => {
        setIsAlterModalVisible(false);
    };

    const onDeleteModalClose = () => {
        setIsDeleteModalVisible(false);
    };

    const separator = () => {
        return <Divider width={1} color="#848483" />;
    };
    
    const handleEmpty = () => {
        return <ThemedText type="defaultSemiBold">Lista Vazia</ThemedText>;
    };

    const handleDelete = (produto: TProdutoAttr) => {
        setDeletingProduto(produto); // Passa o produto para o estado
        setIsDeleteModalVisible(true);
    };

    const handleEdit = (produto: TProdutoAttr) => {
        setEditingProduto(produto); // Passa o produto para o estado
        setIsAlterModalVisible(true);
    };

    const ItemRenderer = ({ produto }: ProdutoListProps) => {
        return (
            <ThemedView key={produto.id}>
                <ThemedText type="defaultSemiBold">{produto.name}</ThemedText>
                <ThemedText type="default">R$ {produto.preco}</ThemedText>
                <Button label="Editar" iconame="pencil" theme="primary" onPress={() => handleEdit(produto)} />
                <Button label="Remover" iconame="trash" theme="primary" onPress={() => handleDelete(produto)} />
            </ThemedView>
        );
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await DZSQLiteSelect<TProdutoAttr>(produtosTable);
            dispatch({ type: ProdutoActionTypes.ADD_PRODUTO, payload: [...data] });
        };
        fetchData();
    }, []);
    
    return (
        <ThemedView>
            <FlatList
                data={state.Produtos}
                renderItem={({ item }) => <ItemRenderer produto={item} />}
                ItemSeparatorComponent={separator}
                ListEmptyComponent={handleEmpty}
                keyExtractor={item => item.id}
            />
            <AlterScreen visible={isAlterModalVisible} handleClose={onAlterModalClose} produto={editingProduto}/>
            <DeleteScreen visible={isDeleteModalVisible} handleClose={onDeleteModalClose} produto={deletingProduto}/>
        </ThemedView>
    );
}

interface DividerProps {
    width?: number;
    orientation?: 'horizontal' | 'vertical';
    color?: string;
    dividerStyle?: any;
}

const Divider: React.FC<DividerProps> = ({
    width = 1,
    orientation = 'horizontal',
    color = '#DFE4EA',
    dividerStyle,
}) => {
    const dividerStyles = [
        { width: orientation === 'horizontal' ? '100%' : width },
        { height: orientation === 'vertical' ? '100%' : width },
        { backgroundColor: color },
        dividerStyle,
    ];
    
    return <View style={dividerStyles} />;
};

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
