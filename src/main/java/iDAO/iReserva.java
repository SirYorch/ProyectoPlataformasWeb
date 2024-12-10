package iDAO;

import java.util.List;

import objects.Reserva;

public interface iReserva {
    public void create (Reserva reserva);
    public Reserva read (int reservaId);
    public void update (Reserva reserva);
    public void delete (Reserva reserva);
    public List <Reserva> findAll();

}
