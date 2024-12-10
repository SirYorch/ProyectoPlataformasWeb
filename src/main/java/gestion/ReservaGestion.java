package gestion;

import iDAO.iReserva;
import java.util.List;
import objects.Reserva;

public class ReservaGestion {
    private iReserva reservaDAO;

    public ReservaGestion(iReserva reservaDAO) {
        this.reservaDAO = reservaDAO;
    }

    public void agregarReserva(Reserva reserva) {
        reservaDAO.create(reserva);
    }

    public Reserva obtenerReserva(int reservaId) {
        return reservaDAO.read(reservaId);
    }

    public void actualizarReserva(Reserva reserva) {
        reservaDAO.update(reserva);
    }

    public void eliminarReserva(Reserva reserva) {
        reservaDAO.delete(reserva);
    }

    public List<Reserva> listarReservas() {
        return reservaDAO.findAll();
    }
}
