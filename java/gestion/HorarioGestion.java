package gestion;

import java.util.List;

import iDAO.IHorarioDAO;
import objects.Horario;

public class HorarioGestion {
    private IHorarioDAO horarioDAO;

    // Constructor para inyectar la dependencia del DAO
    public HorarioGestion(IHorarioDAO horarioDAO) {
        this.horarioDAO = horarioDAO;
    }

    public void crearHorario(Horario horario) {
        horarioDAO.create(horario);
    }

    public Horario obtenerHorarioPorId(int id) {
        return horarioDAO.read(id);
    }

    public void actualizarHorario(Horario horario) {
        horarioDAO.update(horario);
    }

    public void eliminarHorario(Horario horario) {
        horarioDAO.delete(horario);
    }

    public List<Horario> obtenerTodosLosHorarios() {
        return horarioDAO.findAll();
    }
    
}
