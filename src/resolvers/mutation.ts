import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../config/constants';

const resolversMutation: IResolvers = {
    Mutation: {
        async register(_, { equipo }, { db }) {
            // Comprobar que el equipo no existe 
            const equipoCheck = await db.collection(COLLECTIONS.EQUIPOS).
                    findOne({nombre: equipo.nombre});

            if (equipoCheck !== null) {
                return {
                    status: false,
                    message: `El equipo con el nombre de ${equipo.nombre} se encuentra registrado, inténtalo con otro nombre`,
                    equipo: null
                };
            }
            // Comprobar último equipo registrado para asignar ID
            const lastEquipo = await db.collection(COLLECTIONS.EQUIPOS).
                                    find().
                                    limit(1).
                                    sort({registerDate: -1}).toArray();
            if (lastEquipo.length === 0 ) {
                equipo.id = 1;
            } else {
                equipo.id = lastEquipo[0].id + 1;
            }
            // Asignar la fecha en formato ISO en la propiedad registerDate
            equipo.registerDate = new Date().toISOString();
            // Guardar el registro en la colección
            return await db.
                collection(COLLECTIONS.EQUIPOS).
                insertOne(equipo).then(
                    async () => {
                        return {
                            status: true,
                            message: `El equipo con el nombre de ${equipo.nombre} se ha registrado exitosamente`,
                            equipo
                        };
                    }
                ).catch((err: Error) => {
                    console.log(err.message);
                    return {
                        status: false,
                        message: `Error inesperado, inténtalo nuevamente`,
                        equipo: null
                    };
                });
        }
    }
};

export default resolversMutation;