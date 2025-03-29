import { useContext, createContext } from 'react';
import { TProdutoDispatch } from './types';
import { initialState } from './rdcer';

export const ProdutoContext = createContext<TProdutoDispatch|null>(null);

export function useContextProduto() {
    
    const value = useContext(ProdutoContext);
    const nullDispatch:TProdutoDispatch = {state:initialState,dispatch:()=>{}};

    if (process.env.NODE_ENV !== 'production') {
      if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
      }
    }
    
    return value?value:nullDispatch;
}