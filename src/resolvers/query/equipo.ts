import { IResolvers } from '@graphql-tools/utils';
import EquiposService from '../../services/equipo.service';

const resolversEquipoQuery: IResolvers = {
    Query: {
        async equipos(_, { page, itemsPage}, context) {
            return new EquiposService(_, { pagination: { page, itemsPage} }, context).items();
        },
    }
};

export default resolversEquipoQuery;