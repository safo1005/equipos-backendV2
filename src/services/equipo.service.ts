import { IContextData } from '../interfaces/context-data.interface';
import { asignDocumentId, findOneElement } from '../lib/db-operations';
import { COLLECTIONS } from './../config/constants';
import ResolversOperationsService from './resolvers-operations.services';

class EquiposService extends ResolversOperationsService {
    private collection = COLLECTIONS.EQUIPOS;
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }

    // Lista de usuarios
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;
        const result = await this.list(this.collection, 'equipos', page, itemsPage);
        return {
            info: result.info, status: result.status, message: result.message, equipos: result.items
        };
    }

    // Registrar un equipo
    async register() {
        const equipo = this.getVariables().equipo;
        // Comprobar que el equipo no es nulo
        if (equipo === null) {
            return {
                status: false,
                message: 'Ingrese un nombre de equipo válido',
                equipo: null
            };
        }

        // Comprobar que el equipo no existe
        const equipoCheck = await findOneElement(this.getDb(), this.collection, {nombre: equipo?.nombre});

        if ( equipoCheck !== null) {
            return {
                status: false,
                message: `El equipo con el nombre de ${equipo?.nombre} se encuentra registrado`,
                equipo: null
            };
        }

        // Comprobar el último equipo registrado para asignar ID
        equipo!.id = await asignDocumentId(this.getDb(), this.collection, { registerDate: -1 });
        equipo!.valorActual = '0';
        //Asignar la fecha en formato ISO en la propieda registerDate
        equipo!.registerDate = new Date().toISOString();

        const result = await this.add(this.collection, equipo || {}, 'el equipo');
        //Guardar el documento (registro) en la colección
        return {
            status: result.status,
            message: result.message,
            equipo: result.item
        };
    }

    //Modificar un equipo
    async modify() {
        const equipo = this.getVariables().equipo;
        // Comprobar que equipo no es null
        if (equipo === null) {
            return {
                status: false,
                message: 'El equipo no se encuentra registrado',
                equipo: null
            };
        }
        const filter = { id: equipo?.id };
        const result = await this.update(this.collection, filter, equipo || {}, 'el equipo');
        return { status: result.status, message: result.message, equipo: result.item };
    }

    //Borrar equipo seleccionado
    async delete() {
        const id = this.getVariables().id;
        if (id === undefined || id === '') {
            return {
                status: false,
                message: 'Ingrese una identificación válida',
                equipo: null
            };
        }
        const result = await this.del(this.collection, { id }, 'el equipo');
        return {
            status: result.status,
            message: result.message,
        };
    }
}

export default EquiposService;