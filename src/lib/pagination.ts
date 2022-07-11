import { countElements } from './db-operations';
import { Db } from 'mongodb';

export async function pagination(db: Db, collection: string, page: number = 1, itemsPage: number = 2000, filter: object = {}) {
    // Comprobar el número de items por página
    if (itemsPage < 1 || itemsPage > 20) {
        itemsPage = 2000;
    }
    if (page < 1) {
        page = 1;
    } 
    const total = await countElements(db, collection, filter);
    const pages = Math.ceil(total / itemsPage);
    return {
        page,
        skip: (page - 1) * itemsPage,
        itemsPage,
        total,
        pages
    };
}