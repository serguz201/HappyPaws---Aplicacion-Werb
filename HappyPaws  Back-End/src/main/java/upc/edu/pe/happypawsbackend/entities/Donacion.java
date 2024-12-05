package upc.edu.pe.happypawsbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Donacion")
public class Donacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int IdDonacion;

    @Column(name = "FechaDonacion", nullable = false)
    private LocalDate FechaDonacion;

    @Column(name = "TipoDonacion", nullable = false, length = 30)
    private String TipoDonacion;

    @Column(name = "Monto", nullable = false)
    private double Monto;

    @Column(name = "Detalles", nullable = false, length = 30)
    private String Detalles;

    @ManyToOne
    @JoinColumn(name = "IdUsuario")
    private Users users;

}
