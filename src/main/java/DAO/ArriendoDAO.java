package DAO;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;

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
            statement.setDate(2, Date.valueOf(arriendo.getFechaInicio()));
            statement.setDate(3, Date.valueOf(arriendo.getFechaFin()));
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
                        resultSet.getDate("fechaInicio").toLocalDate(),
                        resultSet.getDate("fechaFin").toLocalDate()
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
            statement.setDate(1, Date.valueOf(arriendo.getFechaInicio()));
            statement.setDate(2, Date.valueOf(arriendo.getFechaFin()));
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
                        resultSet.getDate("fechaInicio").toLocalDate(),
                        resultSet.getDate("fechaFin").toLocalDate()
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return arriendos;
    }
}
    

