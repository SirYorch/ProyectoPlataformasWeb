
import java.util.List;
import objetos.Horario;
public interface IHorarioDAO {
    public void create (Horario horario);
    public Horario read (int horarioId);
    public void update (Horario horario);
    public void delete (Horario horario);
    public List <Horario> findAll();

}
