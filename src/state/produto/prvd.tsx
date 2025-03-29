import { PropsWithChildren, useReducer } from "react";
import { ProdutoContext } from "./ctx";
import { initialState, reducer } from "./rdcer";

export function ProdutoProvider({ children }: PropsWithChildren) {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ProdutoContext.Provider value={{ state, dispatch }}>
            {children}
        </ProdutoContext.Provider>
    )
}