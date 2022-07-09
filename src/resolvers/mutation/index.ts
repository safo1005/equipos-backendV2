import GMR from 'graphql-merge-resolvers';
import resolversEquipoMutation from './equipo';

const mutationResolvers = GMR.merge([
    resolversEquipoMutation
]);

export default mutationResolvers;