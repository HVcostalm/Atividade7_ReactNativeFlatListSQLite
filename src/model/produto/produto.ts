import * as Crypto from 'expo-crypto';

export interface TProdutoAttr {
    id:string,
    name:string,
    preco:number,
}

const emptyProduto:TProdutoAttr = {id:"",name:"",preco: 0}

export class Produto implements TProdutoAttr {
    
    private _data: TProdutoAttr = emptyProduto;

    constructor(preco:number,name?:string){
        this._data.id = Crypto.randomUUID()
        this._data.preco = preco?preco:0;
        this._data.name = name?name:""
    }

    get id() {return this._data.id}
    
    get name() {return this._data.name}
    set name(s:string) {this._data.name = s}

    get preco() {return this._data.preco}
    set preco(f:number) {this._data.preco = f}
    
    get data():TProdutoAttr { return this._data }
    get datacpy():TProdutoAttr { return {...this._data} }
}