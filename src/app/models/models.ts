export interface AnswerRequestI {
    success: boolean,
    error: boolean,
    data: any,
    message: any
}

export interface GenericI {
    id: number;    
    abrev: string;
    label?: string;
    nombre?: string;
}