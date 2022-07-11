import { IResolvers } from '@graphql-tools/utils';
import EquiposService from '../../services/equipo.service';

const resolversEquipoMutation: IResolvers = {
    Mutation: {
        register(_, { equipo }, context) {
            return new EquiposService(_, { equipo }, context).register();
        },

        updateEquipo(_, { equipo }, context) {
            return new EquiposService(_, { equipo }, context).modify();
        },

        deleteEquipo(_, { id }, context) {
            return new EquiposService(_, { id }, context).delete();
        }
    }
};

export default resolversEquipoMutation;