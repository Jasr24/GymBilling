export interface ClienteResponseI {
    id : number;
    nombres : string;
    apellidos : string;
    tipoIdentificacion: number;
    identificacion : string;
    telefono : number;
    email : string;
    estado : number;
    nota : string;
    opciones?: {
        id: number,
        icon: string,
        tool_tip: string,
        cass: string
    }
}