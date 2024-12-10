package iDAO;

import java.util.List;

import objects.Ticket;

public interface iTicket {
        public void create (Ticket ticket);
    public Ticket read (int ticketId);
    public void update (Ticket ticket);
    public void delete (Ticket ticket);
    public List <Ticket> findAll();

}
