import java.sql.Date;

public class Ticket {
    String ticketId;
    Date fechaInicio;
    Date fechaFin;
    Usuario usuario;

    public Ticket(String ticketId, Date fechaInicio, Date fechaFin, Usuario usuario){
        this.ticketId = ticketId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.usuario = usuario;
    }
}
