import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const DATABASE_NAME = "lab3db";
export const TABLENAME_PRODUTO = "produto";

export const produtosTable = sqliteTable(TABLENAME_PRODUTO, {
    id: text().primaryKey(),
    name: text().notNull(),
    preco: real().notNull(), 
});
