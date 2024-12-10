package objects;
import java.sql.Date;
import java.sql.Time;

public class Horario {
    private int horarioId;
    private String nombre;
    private Date fechaInicio;
    private Date fechaFin;
    private Time horaInicio;
    private Time horaFin;
    
  public Horario (int horarioId, String nombre, Date fechaInicio, Date fechaFin, Time horaInicio, Time  horaFin) {
    this.horarioId = horarioId;
    this.nombre = nombre;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;


  }
public int getHorarioId() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getHorarioId'");
}

}
