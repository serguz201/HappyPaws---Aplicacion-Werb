import { Albergue } from "./Albergue"

export class Mascota{
    idMascota: number =0
    nombreMascota: string = ''
    nacimientoMascota: Date=new Date(Date.now())
    razaMascota: string=''
    sexoMascota: string=''
    estadoMascota: string=''
    fechaIngresoMascota: Date= new Date(Date.now())
    estadoAdopcion: boolean=false
    albergue: Albergue = new Albergue()
}