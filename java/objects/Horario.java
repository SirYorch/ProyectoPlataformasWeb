package objects;
import java.sql.Date;

public class Horario {
    private int horarioId;
    private String nombre;
    private Date fechaInicio;
    private Date fechaFin;
    private Date horaInicio;
    private Date horaFin;
  public Horario (int horarioId, String nombre, Date fechaInicio, Date fechaFin, Date horaInicio, Date horaFin) {
    this.horarioId = horarioId;
    this.nombre = nombre;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;


  }

}
