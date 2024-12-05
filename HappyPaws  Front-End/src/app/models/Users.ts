export class Users{
    id: number = 0;
    nombre: string = "";
    apellido: string = "";
    direccion: string = "";
    telefono: string = "";
    email: string = "";
    genero: string = "";
    fechaRegistro: Date = new Date(Date.now());
    enabled: boolean = true;
    username: string = "";
    password: string = "";
}