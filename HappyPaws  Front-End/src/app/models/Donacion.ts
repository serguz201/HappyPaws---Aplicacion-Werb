import { Users } from "./Users"

export class Donacion{
    idDonacion: number=0
    fechaDonacion: Date = new Date(Date.now())
    tipoDonacion: string=''
    monto: number=0
    detalles: string=''
    users: Users = new Users()
}