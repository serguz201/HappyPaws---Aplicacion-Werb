package upc.edu.pe.happypawsbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Comprobante")
public class Comprobante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int IdComprobante;

    @Column(name = "MetodoPago", nullable = false, length = 30)
    private String MetodoPago;

    @Column(name = "EstadoComprobante", nullable = false, length = 30)
    private String EstadoComprobante;

    @ManyToOne
    @JoinColumn(name = "IdDonacion")
    private Donacion donacion;
}
