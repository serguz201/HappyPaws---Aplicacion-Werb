package upc.edu.pe.happypawsbackend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DonacionByNameDTO {
    private String Nombre;
    private String Apellido;
    private double MontoTotal;
}
