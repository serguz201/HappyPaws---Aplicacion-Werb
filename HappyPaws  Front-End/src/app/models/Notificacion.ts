import { Users } from "./Users"

export class Notificacion{
    idNotificacion: number=0
    mensaje: string=''
    idEmisor: number=0
    tipo: string=''
    fechaEnvio: Date= new Date(Date.now())
    users: Users = new Users()
}