import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../config/constants';

const resolversQuery: IResolvers = {
    Query: {
        async equipos(_, __, { db }) {
            try {
                return {
                    status: true,
                    message: 'Lista de Equipos cargada correctamente',
                    equipos: await db.collection(COLLECTIONS.EQUIPOS).find().toArray()
                };
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar la lista de equipos',
                    equipos: []
                };
            }
        }
    }
};

export default resolversQuery;