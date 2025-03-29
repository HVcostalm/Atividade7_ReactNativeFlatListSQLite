import { TStateProduto, TProdutoActions, ProdutoActionTypes } from "./types";

export const initialState:TStateProduto = {
    Produtos: [],
}

export function reducer(state: TStateProduto, action: TProdutoActions):TStateProduto {

    switch (action.type) {
        case ProdutoActionTypes.ADD_PRODUTO:
            if (Array.isArray(action.payload)){
                return {...state,Produtos: [...action.payload] };
            }else{
                return {...state,Produtos: [...state.Produtos,action.payload] };
            }
        case ProdutoActionTypes.DELETE_PRODUTO:
            return {
                ...state,
                Produtos: state.Produtos.filter(produto =>
                    Array.isArray(action.payload)
                        ? !action.payload.some(p => p.id === produto.id)
                        : produto.id !== action.payload.id
                ),
            };

        case ProdutoActionTypes.ALTER_PRODUTO:
            return {
                ...state,
                Produtos: state.Produtos.map(produto =>
                    Array.isArray(action.payload)
                        ? action.payload.find(p => p.id === produto.id) || produto
                        : produto.id === action.payload.id ? action.payload : produto
                ),
            };

        default:
            return state;
    }
}