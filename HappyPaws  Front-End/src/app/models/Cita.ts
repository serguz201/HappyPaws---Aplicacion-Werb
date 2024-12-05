import { Albergue } from "./Albergue";
import { Users } from "./Users"

export class Cita{
    idCita: number =0
    fechaCita: Date= new Date(Date.now())
    horaCita: number=0
    estadoCita: string=''
    tipoCita: string=''
    comentarioCita: string=''
    albergue: Albergue = new Albergue()
    users: Users = new Users()
}