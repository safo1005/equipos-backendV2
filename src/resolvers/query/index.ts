import GMR from 'graphql-merge-resolvers';
import resolversEquipoQuery from './equipo';

const queryResolvers = GMR.merge([
    resolversEquipoQuery
]);

export default queryResolvers;