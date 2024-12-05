package upc.edu.pe.happypawsbackend.dtos;
import lombok.Getter;
import lombok.Setter;
import upc.edu.pe.happypawsbackend.entities.Donacion;

@Getter
@Setter
public class ComprobanteDTO {
    private int IdComprobante;
    private String MetodoPago;
    private String EstadoComprobante;
    private Donacion donacion;
}
