package upc.edu.pe.happypawsbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Comentario")
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int IdComentario;

    @Column(name = "Comentario", nullable = false, length = 100)
    private String Comentario;

    @Column(name = "Estrella", nullable = false, length = 30)
    private double Estrella;

    @ManyToOne
    @JoinColumn(name = "IdAlbergue")
    private Albergue albergue;
}
