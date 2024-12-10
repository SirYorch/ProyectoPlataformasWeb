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

    public Ticket(){

    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
