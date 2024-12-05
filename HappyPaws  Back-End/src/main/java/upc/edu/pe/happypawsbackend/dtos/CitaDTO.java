package upc.edu.pe.happypawsbackend.dtos;

import lombok.Getter;
import lombok.Setter;
import upc.edu.pe.happypawsbackend.entities.Users;
import upc.edu.pe.happypawsbackend.entities.Albergue;

import java.time.LocalDate;

@Getter
@Setter
public class CitaDTO {
    private int IdCita;
    private LocalDate FechaCita;
    private int HoraCita;
    private String EstadoCita;
    private String TipoCita;
    private String ComentarioCita;
    private Albergue Albergue;
    private Users users;
}
