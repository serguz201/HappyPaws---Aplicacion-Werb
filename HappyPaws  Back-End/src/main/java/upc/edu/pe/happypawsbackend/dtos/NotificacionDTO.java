package upc.edu.pe.happypawsbackend.dtos;

import lombok.Getter;
import lombok.Setter;
import upc.edu.pe.happypawsbackend.entities.Users;

import java.time.LocalDate;

@Getter
@Setter
public class NotificacionDTO {
    private int IdNotificacion;
    private String Mensaje;
    private int IdEmisor;
    private String Tipo;
    private LocalDate FechaEnvio;
    private Users users;
}
