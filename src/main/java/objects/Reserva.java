package objects;
import java.sql.Date;

public class Reserva{
    Ticket ticket;
    Date inicio;
    Date fin;
    Usuario usuario;
    public Reserva(Ticket ticket, Date inicio, Date fin, Usuario usuario){
        this.ticket = ticket;
        this.inicio = inicio;
        this.fin = fin;
        this.usuario = usuario;
    }

    public Reserva(){

    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public Date getInicio() {
        return inicio;
    }

    public void setInicio(Date inicio) {
        this.inicio = inicio;
    }

    public Date getFin() {
        return fin;
    }

    public void setFin(Date fin) {
        this.fin = fin;
    }
    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
}
