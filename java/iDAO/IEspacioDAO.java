import java.util.List;

public interface IEspacioDAO {
    public void create (Espacio espacio);
    public Espacio read (int espacioId);
    public void update (Espacio espacio);
    public void delete (Espacio espacio);
    public List <Espacio> findAll();

}
