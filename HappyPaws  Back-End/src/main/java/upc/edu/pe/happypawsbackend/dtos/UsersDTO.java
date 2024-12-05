package upc.edu.pe.happypawsbackend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UsersDTO {
    private Long id;
    private String Nombre;
    private String Apellido;
    private String Direccion;
    private String Telefono;
    private String Email;
    private String Genero;
    private LocalDate FechaRegistro;
    private Boolean enabled;
    private String username;
    private String password;

}
