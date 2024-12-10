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
  public Horario (){
    
  }

    public int getHorarioId() {
        return horarioId;
    }

    public void setHorarioId(int horarioId) {
        this.horarioId = horarioId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Time getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(Time horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Time getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(Time horaFin) {
        this.horaFin = horaFin;
    }

}
