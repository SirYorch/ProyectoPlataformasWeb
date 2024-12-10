package DAO;
import iDAO.IArriendoDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import objects.Arriendo;


public class ArriendoDAO implements  IArriendoDAO{
    private Connection connection;

    // Constructor para recibir la conexión a la base de datos (Es hipotetico jejeje)
    public ArriendoDAO(Connection connection) {
        this.connection = connection;
    }

    @Override
    public void create(Arriendo arriendo) {
        String sql = "INSERT INTO arriendos (arriendoId, fechaInicio, fechaFin) VALUES (?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, arriendo.getArriendoId());
            statement.setDate(2, arriendo.getFechaInicio());
            statement.setDate(3, arriendo.getFechaFin());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Arriendo read(int arriendoId) {
        String sql = "SELECT * FROM arriendos WHERE arriendoId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, arriendoId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                return new Arriendo(
                        resultSet.getInt("arriendoId"),
                        resultSet.getDate("fechaInicio"),
                        resultSet.getDate("fechaFin")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void update(Arriendo arriendo) {
        String sql = "UPDATE arriendos SET fechaInicio = ?, fechaFin = ? WHERE arriendoId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setDate(1, arriendo.getFechaInicio());
            statement.setDate(2, arriendo.getFechaFin());
            statement.setInt(3, arriendo.getArriendoId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void delete(Arriendo arriendo) {
        String sql = "DELETE FROM arriendos WHERE arriendoId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, arriendo.getArriendoId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Arriendo> findAll() {
        List<Arriendo> arriendos = new ArrayList<>();
        String sql = "SELECT * FROM arriendos";
        try (PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                arriendos.add(new Arriendo(
                        resultSet.getInt("arriendoId"),
                        resultSet.getDate("fechaInicio"),
                        resultSet.getDate("fechaFin")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return arriendos;
    }
}
    

