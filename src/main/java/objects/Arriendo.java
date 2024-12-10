package objects;
import java.sql.Date;

public class Arriendo{
    private int arriendoId;
    private Date fechaInicio;
    private Date fechaFin;

    public Arriendo (int arriendoId, Date fechaInicio, Date fechaFin){
        this.arriendoId = arriendoId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public Arriendo (){

    }
    public int getArriendoId() {
        return arriendoId;
    }

    public void setArriendoId(int arriendoId) {
        this.arriendoId = arriendoId;
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
    
}
