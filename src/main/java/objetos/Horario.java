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

  public int getHorarioId (){
    return horarioId;
  }

  public void setHorarioId (int horarioId){
    this.horarioId = horarioId;

  }

  public String getNombre (){
    return nombre;
  }

  public void setNombre (String nombre){
    this.nombre = nombre;

  }

  public Date getFechaInicio (){
    return fechaInicio;
  }

  public void setFechaInicio (Date fechaInicio){
    this.fechaInicio = fechaInicio;

  }

  public Date getFechaFin (){
    return fechaFin;
  }

  public void setFechaFin (Date fechaFin){
    this.fechaFin = fechaFin;

  }

  public Date getHoraInicio (){
    return horaInicio;
  }

  public void setHoraInicio (Date horaInicio){
    this.horaInicio = horaInicio;

  }

  public Date getHoraFin (){
    return fechaFin;
  }

  public void setHoraFin (Date horaFin){
    this.horaFin = horaFin;

  }

}
