import java.util.Date;
public class Reserva {
    Ticket ticket;
    Date fechaInicio;
    Date feechaFin;
    Usuario usuario;
    public Reserva(Ticket ticket,Date fechaInicio, Date fechaFin, Usuario usuario){
        this.ticket = ticket;
        this.fechaInicio= fechaInicio;
        this.feechaFin = fechaFin;
        this.usuario = usuario;
    }
}
