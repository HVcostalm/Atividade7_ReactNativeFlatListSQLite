import { TProdutoAttr } from "@/src/model/produto";

// action types
export enum ProdutoActionTypes {
    ADD_PRODUTO = "ADD_PRODUTO",
    DELETE_PRODUTO = "DELETE_PRODUTO",
    ALTER_PRODUTO = "ALTER_PRODUTO",
}

type DeleteProdutoAction = {type:ProdutoActionTypes.DELETE_PRODUTO,payload:TProdutoAttr|TProdutoAttr[]}
type AddProdutoAction = {type:ProdutoActionTypes.ADD_PRODUTO,payload:TProdutoAttr|TProdutoAttr[]}
type AlterProdutoAction = {type:ProdutoActionTypes.ALTER_PRODUTO,payload:TProdutoAttr|TProdutoAttr[]}

export type TProdutoActions = AddProdutoAction|DeleteProdutoAction|AlterProdutoAction

// state types
export type TStateProduto = {
    Produtos: TProdutoAttr[]
}

// reducer dispatch
export type TProdutoDispatch = {
    state: TStateProduto;
    dispatch: React.Dispatch<TProdutoActions>;
};
