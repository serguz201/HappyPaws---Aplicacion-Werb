package upc.edu.pe.happypawsbackend.dtos;

import lombok.Getter;
import lombok.Setter;
import upc.edu.pe.happypawsbackend.entities.Albergue;

import java.time.LocalDate;

@Getter
@Setter
public class MascotaDTO {
    private int IdMascota;
    private String NombreMascota;
    private LocalDate NacimientoMascota;
    private String RazaMascota;
    private String SexoMascota;
    private String EstadoMascota;
    private LocalDate FechaIngresoMascota;
    private boolean EstadoAdopcion;
    private Albergue Albergue;
}
