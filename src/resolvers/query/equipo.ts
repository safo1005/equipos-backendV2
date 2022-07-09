import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../../config/constants';
import { findElements } from '../../lib/db-operations';

const resolversEquipoQuery: IResolvers = {
    Query: {
        async equipos(_, __, { db }) {
            try {
                return {
                    status: true,
                    message: 'Lista de Equipos cargada correctamente',
                    equipos: await findElements(db, COLLECTIONS.EQUIPOS, {}),
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

export default resolversEquipoQuery;