package upc.edu.pe.happypawsbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "rol"})})
public class Role implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rol",nullable = false, length = 20)
    private String rol;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;
}
