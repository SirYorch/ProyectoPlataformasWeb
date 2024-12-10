package objects;

import java.sql.Date;


public class Ticket {
    int id;
    Date inicio;
    Date fin;
    Usuario usuario;
    public Ticket(int id, Date inicio, Date fin, Usuario usuario){
        this.id = id;
        this.inicio = inicio;
        this.fin = fin;
        this.usuario = usuario;
    }
}
