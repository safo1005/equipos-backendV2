import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../../config/constants';
import { asignDocumentId, findOneElement, insertOneElement } from '../../lib/db-operations';

const resolversEquipoMutation: IResolvers = {
    Mutation: {
        async register(_, { equipo }, { db }) {
            // Comprobar el último equipo registrado para asignar ID
            equipo.id = await asignDocumentId(db, COLLECTIONS.EQUIPOS, { registerDate: -1 });
            // Comprobar que el equipo no existe 
            const equipoCheck = await findOneElement(db, COLLECTIONS.EQUIPOS, { nombre: equipo.nombre });

            if (equipoCheck !== null) {
                return {
                    status: false,
                    message: `El equipo con el nombre de ${equipo.nombre} se encuentra registrado, inténtalo con otro nombre`,
                    equipo: null
                };
            }

            // Asignar la fecha en formato ISO en la propiedad registerDate
            equipo.registerDate = new Date().toISOString();
            // Guardar el registro en la colección
            return await insertOneElement(db, COLLECTIONS.EQUIPOS, equipo)
                .then(
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

export default resolversEquipoMutation;