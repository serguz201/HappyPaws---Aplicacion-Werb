package upc.edu.pe.happypawsbackend.dtos;

import lombok.Getter;
import lombok.Setter;
import upc.edu.pe.happypawsbackend.entities.Users;

@Getter
@Setter
public class RoleDTO {
    private Long id;
    private String rol;
    private Users user;
}
