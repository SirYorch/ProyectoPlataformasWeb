import java.sql.Date;

public class Reserva {
    Ticket ticket;
    Date inicio;
    Date fin;
    String placa;
    Usuario usuario;
    public Reserva(Ticket ticket, Date inicio, Date fin, String placa, Usuario usuario){
        this.ticket = ticket;
        this.inicio = inicio;
        this.fin = fin;
        this.placa = placa;
        this.usuario = usuario;

    }
}
