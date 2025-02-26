package iDAO;
import java.util.List;

import objects.Arriendo;
public interface IArriendoDAO {
    public void create (Arriendo arriendo);
    public Arriendo read (int arriendoId);
    public void update (Arriendo arriendo);
    public void delete (Arriendo arriendo);
    public List <Arriendo> findAll();

}