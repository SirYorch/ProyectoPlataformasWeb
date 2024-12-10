package gestion;
import java.util.List;

public class ArriendoGestion {
    private IArriendoDAO arriendoDAO;

    // Constructor para inyectar la dependencia del DAO
    public ArriendoGestion(IArriendoDAO arriendoDAO) {
        this.arriendoDAO = arriendoDAO;
    }

    public void crearArriendo(Arriendo arriendo) {
        arriendoDAO.create(arriendo);
    }

    public Arriendo obtenerArriendoPorId(int id) {
        return arriendoDAO.read(id);
    }

    public void actualizarArriendo(Arriendo arriendo) {
        arriendoDAO.update(arriendo);
    }

    public void eliminarArriendo(Arriendo arriendo) {
        arriendoDAO.delete(arriendo);
    }

    public List<Arriendo> obtenerTodosLosArriendos() {
        return arriendoDAO.findAll();
    }
}
