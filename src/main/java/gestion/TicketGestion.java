package gestion;

import iDAO.iTicket;
import objects.Ticket;
import java.util.List;

public class TicketGestion {
    private iTicket ticketDAO;

    public TicketGestion(iTicket ticketDAO) {
        this.ticketDAO = ticketDAO;
    }

    public void agregarTicket(Ticket ticket) {
        ticketDAO.create(ticket);
    }

    public Ticket obtenerTicket(int ticketId) {
        return ticketDAO.read(ticketId);
    }

    public void actualizarTicket(Ticket ticket) {
        ticketDAO.update(ticket);
    }

    public void eliminarTicket(Ticket ticket) {
        ticketDAO.delete(ticket);
    }

    public List<Ticket> listarTickets() {
        return ticketDAO.findAll();
    }
}
