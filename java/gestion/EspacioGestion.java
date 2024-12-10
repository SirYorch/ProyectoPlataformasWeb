package gestion;

public class EspacioGestion {
    private IEspacioDAO espacioDAO;

    // Constructor para inyectar la dependencia del DAO
    public EspacioGestion(IEspacioDAO espacioDAO) {
        this.espacioDAO = espacioDAO;
    }

    public void crearEspacio(Espacio espacio) {
        espacioDAO.create(espacio);
    }

    public Espacio obtenerEspacioPorId(int id) {
        return espacioDAO.read(id);
    }

    public void actualizarEspacio(Espacio espacio) {
        espacioDAO.update(espacio);
    }

    public void eliminarEspacio(Espacio espacio) {
        espacioDAO.delete(espacio);
    }

    public List<Espacio> obtenerTodosLosEspacios() {
        return espacioDAO.findAll();
    }
}
