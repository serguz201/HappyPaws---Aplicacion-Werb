import { Donacion } from "./Donacion"

export class Comprobante{
    idComprobante: number=0
    metodoPago: string=''
    estadoComprobante: string=''
    donacion: Donacion= new Donacion()
}