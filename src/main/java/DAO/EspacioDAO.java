package DAO;
import iDAO.IEspacioDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import objects.Espacio;
public class EspacioDAO implements IEspacioDAO{
    
     private Connection connection;

    // Constructor para recibir la conexión a la base de datos (Es hipotetico jejeje)
    public EspacioDAO(Connection connection) {
        this.connection = connection;
    }
    @Override
    public void create(Espacio espacio) {
        String sql = "INSERT INTO espacios (espacioId, espacioNum, espacioLetra, estado) VALUES (?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, espacio.getEspacioId());
            statement.setInt(2, espacio.getEspacioNum());
            statement.setString(3, espacio.getEspacioLetra());
            statement.setString(4, espacio.getEstado());

            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

     @Override
    public Espacio read(int espacioId) {
        String sql = "SELECT * FROM espacios WHERE espacioId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, espacioId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                return new Espacio(
                        resultSet.getInt("espacioId"),
                        resultSet.getInt("espacioNum"),
                        resultSet.getString("espacioLetra"),
                        resultSet.getString("estado")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void update(Espacio espacio) {
        String sql = "UPDATE espacios SET espacioNum = ?, espacioLetra = ?, estado = ? WHERE espacioId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, espacio.getEspacioNum());
            statement.setString(2, espacio.getEspacioLetra());
            statement.setString(3, espacio.getEstado());
            statement.setInt(4, espacio.getEspacioId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void delete(Espacio espacio) {
        String sql = "DELETE FROM espacios WHERE espacioId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, espacio.getEspacioId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Espacio> findAll() {
        List<Espacio> espacios = new ArrayList<>();
        String sql = "SELECT * FROM espacios";
        try (PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                espacios.add(new Espacio(
                        resultSet.getInt("espacioId"),
                        resultSet.getInt("espacioNum"),
                        resultSet.getString("espacioLetra"),
                        resultSet.getString("estado")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return espacios;
    }


}
