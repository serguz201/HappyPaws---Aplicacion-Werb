package upc.edu.pe.happypawsbackend.dtos;

import lombok.Getter;
import lombok.Setter;
import upc.edu.pe.happypawsbackend.entities.Users;

import java.time.LocalDate;

@Getter
@Setter
public class DonacionDTO {
    private int IdDonacion;
    private LocalDate FechaDonacion;
    private String TipoDonacion;
    private double Monto;
    private String Detalles;
    private Users users;
}
